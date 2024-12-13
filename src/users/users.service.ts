import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getAllUsersWithoutOrganization() {
    return this.prismaService.user.findMany({
      select: { id: true, email: true },
      where: { organization: null },
    });
  }

  async assignUserToOrg(userId: number, orgId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) return new NotFoundException('User not found');

    const org = await this.prismaService.organization.findUnique({
      where: { id: orgId },
    });
    if (!org) return new NotFoundException('Organization not found');

    return this.prismaService.user.update({
      data: { organizationId: orgId },
      where: { id: userId },
    });
  }

  async bulkAssignUserToOrg(userIds: Array<number>, orgId: number) {
    if (userIds.length === 0)
      throw new BadRequestException('Empty users IDs array');

    const org = await this.prismaService.organization.findUnique({
      where: { id: orgId },
    });
    if (!org) throw new NotFoundException('Organization not found');

    const users = await this.prismaService.user.findMany({
      where: { id: { in: userIds } },
    });
    if (!users || users.length !== userIds.length)
      throw new NotFoundException('Some of provided users were not found');

    const result = await this.prismaService.user.updateMany({
      where: { id: { in: userIds } },
      data: { organizationId: orgId },
    });

    return { message: 'Updated rows', count: result.count };
  }
}
