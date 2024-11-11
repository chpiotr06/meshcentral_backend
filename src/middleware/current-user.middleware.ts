import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User as PrismaUser } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUserMid?: PrismaUser;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) return next();

    const bearerToken = bearerHeader.split(' ')[1];

    const user = this.jwtService.decode(bearerToken);

    if (user.sub) {
      const realUser = await this.usersService.findUserById(user.sub);
      req.currentUserMid = realUser;
    }

    next();
  }
}
