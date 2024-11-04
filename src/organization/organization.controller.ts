import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { OrganizationService } from './organization.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  async addOrganization(@Body() body: CreateOrganizationDto) {
    return this.organizationService.createOrganization(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrganizations() {
    return ['accessible only by authenticated user'];
  }
}
