import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrganizationModule } from './organization/organization.module';
import { DevicesModule } from './devices/devices.module';
import { GeolocationsModule } from './geolocations/geolocations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
    PrismaModule,
    OrganizationModule,
    DevicesModule,
    GeolocationsModule,
  ],
  providers: [AppService, PrismaService],
})
export class AppModule {}
