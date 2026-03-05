import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserRole } from '../entities/user.entites';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  nom: string;

  @IsEmail()
  email: string;

  @IsString()
  // @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
