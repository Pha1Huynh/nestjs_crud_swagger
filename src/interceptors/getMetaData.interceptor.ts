import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { Reflector } from '@nestjs/core';
@Injectable()
export class getMetaDataInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const duplicateError = this.reflector.get<string>(
      'duplicate_error',
      context.getHandler(),
    );
    request.duplicateError = duplicateError;
    return next.handle();
  }
}
