import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { User as PrismaUser } from '@prisma/client';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class DevicesService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createDevice(body: CreateDeviceDto, user: PrismaUser) {
    const uuid = randomUUID();
    const token = this.jwtService.sign({ sub: uuid });
    const salt = await genSalt(10);
    const hashedToken = await hash(token, salt);

    const newDevice = await this.prismaService.devices.create({
      data: {
        uuid,
        token: hashedToken,
        mac: body.mac,
        name: body.name,
        firmwareVersion: body.firmwareVersion,
        ipv4: body.ipv4,
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationId: user.organizationId,
      },
    });

    return { ...body, token, id: newDevice.id, uuid };
  }

  async authorizeDevice(token: string, uuid: string) {
    const device = await this.getDeviceByUUID(uuid);
    if (!device) throw new NotFoundException('Such device not found');

    const compareResult = await compare(token, device.token);

    if (!compareResult) throw new UnauthorizedException();

    return device;
  }

  async getDeviceByUUID(uuid: string) {
    const found = await this.prismaService.devices.findUnique({
      where: { uuid: uuid },
    });

    if (!found)
      throw new NotFoundException('Device with provided uuid not found');

    return found;
  }

  async getDeviceGeolocationsByUuid(userOrgId: number, deviceUuid: string) {
    return this.prismaService.devices.findUnique({
      select: {
        Geolocations: {
          select: { latitude: true, longitude: true },
          orderBy: { addedAt: 'desc' },
        },
      },
      where: { organizationId: userOrgId, uuid: deviceUuid },
    });
  }

  async getAllDevices(userOrgId: number) {
    return this.prismaService.devices.findMany({
      select: {
        name: true,
        ipv4: true,
        mac: true,
        uuid: true,
        firmwareVersion: true,
        createdAt: true,
      },
      where: {
        organizationId: userOrgId,
      },
    });
  }

  async getDevicesWithGeolocation(userOrgId: number) {
    const data = await this.prismaService.devices.findMany({
      select: {
        name: true,
        ipv4: true,
        mac: true,
        uuid: true,
        Geolocations: {
          select: {
            latitude: true,
            longitude: true,
          },
          orderBy: { addedAt: 'desc' },
          take: 1,
        },
      },
      where: {
        organizationId: userOrgId,
        Geolocations: { some: {} },
      },
    });
    return data;
  }
}
