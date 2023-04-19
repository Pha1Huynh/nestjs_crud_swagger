import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-users.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-users.dto';
import { RoleService } from 'src/role/role.service';
import { CreateRoleDto } from 'src/role/dto/create-role.dto';
import { Role } from 'src/role/entities/role.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
    private roleService: RoleService,

    private configService: ConfigService,
  ) {}

  async findUserById(id: number): Promise<User> {
    let userFind = await this.users.findOne({ where: { id } });

    return userFind;
  }
  async findUserByUsernameOrEmail(
    userNameOrEmailAddress: string,
  ): Promise<User> {
    let userFind = await this.users.findOne({
      where: [
        { userName: userNameOrEmailAddress },
        { emailAddress: userNameOrEmailAddress },
      ],
      relations: ['role'],

      loadEagerRelations: true,
    });
    return userFind;
  }
  async create(userDto: UpdateUserDto, listRole: Role[]): Promise<any> {
    const saltRounds = this.configService.get<number>('saltRounds');
    const { userName, password } = userDto;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const userInstance = await this.users.create({
      ...userDto,
      password: hashPassword,
      role: listRole,
    });
    const user = await this.users.save(userInstance);

    if (user) {
      return user;
    }
  }
  async update(userDto: UpdateUserDto): Promise<any> {
    const saltRounds = this.configService.get<number>('saltRounds');
    const { userName, password } = userDto;

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const userUpdate = await this.users.update(
      { emailAddress: userDto.emailAddress },
      { ...userDto },
    );
    return userUpdate;
  }
}
