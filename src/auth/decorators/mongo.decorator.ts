import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const MongoDecorator = ({ duplicate, sfdfasdfsadfsdfsadfsad }) =>
  SetMetadata('mongoDecorator', [
    { errCode: 11000, message: 'Duplicated data', status: 400 },
  ]);

// export const User = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const mongoDecorator = Get.getHandler(),
//     );
//     const request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );
