import {
  BadRequestException,
  Body,
  Controller,
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
}
