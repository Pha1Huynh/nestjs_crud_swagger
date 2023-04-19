import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserResDTO } from 'src/users/dto/UserResDto.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtValidateInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    if (request.headers['authorization'] === undefined)
      return response.status(200).json({ ...UserResDTO });
    const token = request.headers['authorization'].split(' ')[1];
    let result = this.jwtService.verify(token, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
    });

    request.user = result;
    return next.handle();
  }
}
