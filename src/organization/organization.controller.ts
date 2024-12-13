import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { OrganizationService } from './organization.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  async addOrganization(@Body() body: CreateOrganizationDto) {
    return this.organizationService.createOrganization(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  async getOrganizations() {
    return this.organizationService.getAllOrganisations();
  }
}
