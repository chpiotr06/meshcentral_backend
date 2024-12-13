import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CreateUserWithOrgDto } from './dtos/create-user-with-org.dot';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(data: CreateUserDto | CreateUserWithOrgDto) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(data.password, salt);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          organizationId: data.organizationId ? data.organizationId : null,
        },
      });

      return user;
    } catch (error) {
      if (error.code === 'P2002')
        throw new BadRequestException('Email already in use');

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) throw new BadRequestException('Invalid credentials');

    const compareResult = await compare(password, user.password);
    if (!compareResult) throw new BadRequestException('Invalid credentials');

    if (user && compareResult) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- destructure to remove not needed property
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.email,
      sub: user.id,
      isAdmin: user.isAdmin,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user,
    };
  }
}
