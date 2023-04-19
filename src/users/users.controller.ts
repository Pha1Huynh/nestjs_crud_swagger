import {
  Controller,
  Request,
  Response,
  Get,
  Post,
  Body,
  HttpStatus,
  ValidationPipe,
  UseGuards,
  HttpException,
  Patch,
  Header,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-users.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { RolesGuard } from 'src/auth/guards/roles.guard';

import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-users.dto';
import { BranchService } from 'src/branch/branch.service';
import { GenderService } from 'src/gender/gender.service';
import { PositionService } from 'src/position/position.service';
import { RoleService } from 'src/role/role.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private branchService: BranchService,
    private genderService: GenderService,
    private positionService: PositionService,
    private roleService: RoleService,
  ) {}
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('api/services/app/User/Create')
  async create(
    @Request() req,
    @Response() res,
    @Body(new ValidationPipe()) usersDto: CreateUserDto,
  ) {
    let errorArr = [];
    const branch = await this.branchService.findById(usersDto.branch);
    const sex = await this.genderService.findById(usersDto.sex);
    const level = await this.positionService.findById(usersDto.level);
    const role = await this.roleService.findAll(usersDto.roleNames);

    if (role.length !== usersDto.roleNames.length) {
      errorArr.push('Role invalid');
    }
    if (!branch) {
      errorArr.push('Branch invalid');
    }
    if (!sex) {
      errorArr.push('Gender invalid');
    }
    if (!level) {
      errorArr.push('level invalid');
    }

    if (errorArr.length > 0) {
      throw new HttpException(`${errorArr}`, HttpStatus.BAD_REQUEST);
    }

    let findUser = await this.usersService.findUserByUsernameOrEmail(
      usersDto.emailAddress,
    );
    if (findUser) {
      throw new HttpException('User is exist', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.usersService.create(usersDto, role);

    if (newUser) {
      res.status(HttpStatus.CREATED).json({ data: newUser });
    }
  }
  @Patch('update')
  async update(
    @Request() req,
    @Response() res,
    @Body(new ValidationPipe()) usersDto: UpdateUserDto,
  ) {
    let userFind = await this.usersService.findUserByUsernameOrEmail(
      usersDto.emailAddress,
    );
    if (!userFind) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    let createdUser = await this.usersService.update(usersDto);
    res.status(HttpStatus.CREATED).json({ data: createdUser });
  }
}
