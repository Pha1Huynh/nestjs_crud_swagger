import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // const mongoDecorator = this.reflector.get<any>(
    //   'mongoDecorator',
    //   context.getHandler(),
    // );

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    let isHavePermisson = user.role.some((item) => {
      return roles.includes(item);
    });

    if (!isHavePermisson) {
      throw new HttpException('You not have permisson', HttpStatus.FORBIDDEN);
    }
    return isHavePermisson;
  }
}
