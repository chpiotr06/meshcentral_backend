import { Injectable } from '@nestjs/common';
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
}
