import { IsOptional, IsPostalCode, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsPostalCode('PL')
  postal: string;

  @IsString()
  addressLine1: string;

  @IsString()
  addressLine2: string;

  @IsString()
  @IsOptional()
  addressLine3: string | null | undefined;
}
