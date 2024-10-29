import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganizationDto } from './dtos/create-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(private prismaService: PrismaService) {}

  async createOrganization(data: CreateOrganizationDto) {
    return this.prismaService.organization.create({
      data: {
        name: data.name,
        address: {
          create: {
            country: data.country,
            postal: data.postal,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            addressLine3: data.addressLine3,
          },
        },
      },
    });
  }

  async findOrgById(id: number) {
    return this.prismaService.organization.findUnique({ where: { id: id } });
  }
}
