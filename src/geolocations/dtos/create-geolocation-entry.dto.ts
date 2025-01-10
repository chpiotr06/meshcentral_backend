import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateGeolocationEntryDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsUUID()
  uuid: string;

  @IsString()
  token: string;
}
