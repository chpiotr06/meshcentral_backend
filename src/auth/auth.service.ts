import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(data: CreateUserDto) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(data.password, salt);

    return this.prismaService.user.create({
      data: { email: data.email, password: hashedPassword },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    const compareResult = await compare(password, user.password);

    if (user && compareResult) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- destructure to remove not needed property
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
