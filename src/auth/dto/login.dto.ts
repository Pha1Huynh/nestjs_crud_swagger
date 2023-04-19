import { IsString, IsInt, IsEmail, IsBoolean } from 'class-validator';

export class LoginDto {
  @IsString()
  userNameOrEmailAddress: string;

  @IsString()
  password: string;

  @IsBoolean()
  rememberClient: boolean;
}
