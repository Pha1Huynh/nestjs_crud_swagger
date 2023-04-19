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

export class CreateUserDto {
  @ValidateIf((object, value) => value === null)
  @IsInt()
  id: number | null;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  userCode: string;

  @IsArray()
  @MinLength(1)
  roleNames: string[];

  @IsString()
  surname: string;

  @IsString()
  phoneNumber: string;

  @IsInt()
  allowedLeaveDay: number;

  @IsInt()
  @ValidateIf((object, value) => value === null)
  managerId: number | null;

  @IsInt()
  branch: number;

  @IsString()
  @ValidateIf((object, value) => value === null)
  imagePath: string | null;

  @IsInt()
  level: number;

  @IsInt()
  sex: number;

  @IsInt()
  salary: number;

  @IsDate()
  @ValidateIf((object, value) => value === null)
  salaryAt: Date | null;

  @IsString()
  @ValidateIf((object, value) => value === null)
  morningStartAt: string | null;

  @ValidateIf((object, value) => value === null)
  @IsString()
  morningEndAt: string | null;

  @IsNumber()
  morningWorking: number;

  @ValidateIf((object, value) => value === null)
  @IsString()
  afternoonStartAt: string | null;

  @ValidateIf((object, value) => value === null)
  @IsString()
  afternoonEndAt: string | null;

  @IsNumber()
  afternoonWorking: number;
}
