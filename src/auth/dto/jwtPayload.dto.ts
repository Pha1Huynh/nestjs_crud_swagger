import { IsString, IsInt, IsEmail } from 'class-validator';

export class JwtPayloadDto {
  @IsInt()
  id: number;

  @IsString()
  userName: string;

  @IsEmail()
  emailAddress: string;

  @IsString()
  name: string;

  @IsString()
  role: string[];
}
