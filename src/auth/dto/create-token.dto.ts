import { IsString, IsInt, IsEmail } from 'class-validator';

export class CreateTokenDto {
  @IsEmail()
  emailAddress: string;

  @IsString()
  password: string;
}
