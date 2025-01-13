import { IsIP, IsMACAddress, IsSemVer, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  name: string;

  @IsMACAddress()
  mac: string;

  @IsSemVer()
  firmwareVersion: string;

  @IsIP('4')
  ipv4: string;
}
