import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  async addOrganization(@Body() body: CreateOrganizationDto) {
    return this.organizationService.createOrganization(body);
  }
}
