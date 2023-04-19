import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Response,
  HttpStatus,
  UseInterceptors,
  HttpException,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { UsersService } from './../users/users.service';
import { BaseResDto } from 'src/dto/baseResDto.dto';
import { AuthResultDto } from 'src/dto/authResultDto.dto';
import { UserResDTO } from 'src/users/dto/UserResDto.dto';
import { JwtValidateInterceptor } from 'src/interceptors/jwtValidate.interceptor';
import { ApiTags } from '@nestjs/swagger';
const fakeData = {
  result: {
    application: {
      version: '4.3.0.0',
      releaseDate: '2021-07-20T15:49:07.1350156+07:00',
      features: {},
    },
    user: null,
    tenant: null,
  },
  targetUrl: null,
  success: true,
  error: null,
  unAuthorizedRequest: false,
  __abp: true,
};
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('api/TokenAuth/Authenticate')
  async login(
    @Request() req,
    @Response() res,
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ) {
    let findUser = await this.usersService.findUserByUsernameOrEmail(
      loginDto.userNameOrEmailAddress,
    );
    if (!findUser) {
      throw new HttpException(
        'Wrong user name or emailAddress or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    let validateUser = await this.authService.validateUser(
      loginDto.userNameOrEmailAddress,
      loginDto.password,
    );
    if (!validateUser) {
      if (!validateUser) {
        throw new HttpException(
          'Wrong user name or emailAddress or password',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    let roleData = [];
    validateUser.role.forEach((item) => roleData.push(item.roleName));
    let tokens = await this.authService.login(validateUser, roleData);
    if (!tokens) {
      throw new HttpException(
        'Genarate tokens failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    res.status(HttpStatus.OK).json({
      ...BaseResDto,
      result: {
        ...AuthResultDto,
        accessToken: tokens.accessToken,
        userId: findUser.id,
      },
    });
  }
  @UseInterceptors(JwtValidateInterceptor)
  @Get('api/services/app/Session/GetCurrentLoginInformations')
  async getLoginInfo(@Request() req, @Response() res) {
    const { user } = req;
    if (!user || !user.id) {
      return res.status(HttpStatus.OK).json({ ...UserResDTO });
    }

    let findUser = await this.usersService.findUserById(user.id);
    if (!findUser) {
      return res.status(HttpStatus.OK).json({ ...UserResDTO });
    }
    res.status(HttpStatus.OK).json({
      ...UserResDTO,
      result: {
        ...UserResDTO.result,
        user: findUser,
      },
    });
  }
  @Post('refresh-token')
  async refreshToken(@Request() req, @Response() res) {
    let refreshToken: string = req.body.refreshToken;
    if (refreshToken) {
      let accessToken = await this.authService.refreshToken(refreshToken);
      if (!accessToken) {
        throw new HttpException(
          'Refresh token failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      res.status(HttpStatus.OK).json(accessToken);
    } else {
      throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);
    }
  }
}
