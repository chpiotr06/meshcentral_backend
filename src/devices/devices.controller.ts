import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createDevice(@Body() body: CreateDeviceDto, @Request() req) {
    if (!req.currentUserMid) throw new BadRequestException('Invalid user data');
    if (!req.currentUserMid.organizationId)
      throw new BadRequestException('User not assigned to any organization');

    return this.devicesService.createDevice(body, req.currentUserMid);
  }

  @Get()
  async getDevices(@Request() req) {
    if (!req.currentUserMid) throw new BadRequestException('Invalid user data');
    if (!req.currentUserMid.organizationId)
      throw new BadRequestException('User not assigned to any organization');

    return this.devicesService.getAllDevices(req.currentUserMid.organizationId);
  }

  @Get('/with-geolocation')
  @UseGuards(JwtAuthGuard)
  async getDevicesWithGeolocation(@Request() req) {
    if (!req.currentUserMid) throw new BadRequestException('Invalid user data');
    if (!req.currentUserMid.organizationId)
      throw new BadRequestException('User not assigned to any organization');

    return this.devicesService.getDevicesWithGeolocation(
      req.currentUserMid.organizationId,
    );
  }

  @Get(':uuid')
  async getGeolocationsByDeviceUuid(@Param() params: { uuid }, @Request() req) {
    if (!req.currentUserMid) throw new BadRequestException('Invalid user data');
    if (!req.currentUserMid.organizationId)
      throw new BadRequestException('User not assigned to any organization');

    return this.devicesService.getDeviceGeolocationsByUuid(
      req.currentUserMid.organizationId,
      params.uuid,
    );
  }
}
