import { Module, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { APP_PIPE } from '@nestjs/core';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    UsersService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
