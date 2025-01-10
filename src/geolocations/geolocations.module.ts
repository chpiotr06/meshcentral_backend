import { Module } from '@nestjs/common';
import { GeolocationsController } from './geolocations.controller';
import { GeolocationsService } from './geolocations.service';
import { DevicesModule } from 'src/devices/devices.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, DevicesModule],
  controllers: [GeolocationsController],
  providers: [GeolocationsService],
})
export class GeolocationsModule {}
