import { SetMetadata } from '@nestjs/common';

export const DuplicateError = (message: string) =>
  SetMetadata('duplicate_error', message);
