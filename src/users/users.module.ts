import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { APP_PIPE } from '@nestjs/core';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CurrentUserMiddleware } from 'src/middleware/current-user.middleware';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [
    UsersService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
