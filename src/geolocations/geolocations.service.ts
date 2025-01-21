import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGeolocationEntryDto } from './dtos/create-geolocation-entry.dto';
import { DevicesService } from 'src/devices/devices.service';

@Injectable()
export class GeolocationsService {
  constructor(
    private prismaService: PrismaService,
    private devicesService: DevicesService,
  ) {}

  async createGeolocationEntry(body: CreateGeolocationEntryDto) {
    const device = await this.devicesService.authorizeDevice(
      body.token,
      body.uuid,
    );
    if (!device) throw new NotFoundException();

    return this.prismaService.geolocations.create({
      data: {
        latitude: body.latitude,
        longitude: body.longitude,
        deviceId: device.id,
      },
    });
  }
}
