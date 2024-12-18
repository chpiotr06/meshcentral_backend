import { IsEmail, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateUserWithOrgDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirm: string;

  @IsNumber()
  @IsOptional()
  organizationId: number;
}
