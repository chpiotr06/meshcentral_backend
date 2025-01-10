import { IsMACAddress, IsSemVer, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  name: string;

  @IsMACAddress()
  mac: string;

  @IsSemVer()
  firmwareVersion: string;
}
