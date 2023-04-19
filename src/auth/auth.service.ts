import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { User } from 'src/users/entities/user.entity';
import { Token } from './entities/tokens.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/users/dto/update-users.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private tokens: Repository<Token>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    userNameOrEmailAddress: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findUserByUsernameOrEmail(
      userNameOrEmailAddress,
    );

    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        delete user.password;
        return user;
      } else {
        return null;
      }
    }
    return null;
  }

  async login(user: UpdateUserDto, roleData: string[]) {
    const payload = {
      id: user.id,
      emailAddress: user.emailAddress,
      role: roleData,
    };

    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
    });

    if (accessToken) {
      return {
        accessToken,
      };
    }
  }
  async refreshToken(refreshToken: string) {
    let result = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
    });
    if (result) {
      const payload = {
        userName: result.userName,
        id: result.id,
        role: result.role,
      };

      return {
        access_token: await this.jwtService.sign(payload, {
          secret: process.env.ACCESS_TOKEN_EXPIRED,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
        }),
      };
    }
  }
}
