import {
  IsString,
  IsDate,
  IsInt,
  IsEmail,
  MinLength,
  IsNotEmpty,
  ValidateIf,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateRoleDto {
  @IsInt()
  id: number;

  @IsString()
  roleName: string;
}
