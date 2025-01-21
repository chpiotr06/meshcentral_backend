import { Body, Controller, Post } from '@nestjs/common';
import { CreateGeolocationEntryDto } from './dtos/create-geolocation-entry.dto';
import { GeolocationsService } from './geolocations.service';

@Controller('geolocations')
export class GeolocationsController {
  constructor(private geolocationsService: GeolocationsService) {}
  @Post()
  async addGeolocation(@Body() body: CreateGeolocationEntryDto) {
    return this.geolocationsService.createGeolocationEntry(body);
  }
}
