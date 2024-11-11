import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findUserById(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async assignUserToOrg(userId: number, orgId: number) {
    const user = this.prismaService.user.findUnique({ where: { id: userId } });
    if (!user) return new NotFoundException('User not found');

    const org = this.prismaService.organization.findUnique({
      where: { id: orgId },
    });
    if (!org) return new NotFoundException('Organization not found');

    return this.prismaService.user.update({
      data: { organizationId: orgId },
      where: { id: userId },
    });
  }
}
