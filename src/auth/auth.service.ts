import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
  ) {}

  async createUser(data: CreateUserDto) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(data.password, salt);

    return this.prismaService.user.create({
      data: { email: data.email, password: hashedPassword },
    });
  }

  async loginUser(data: LoginUserDto) {
    const user = await this.usersService.findUserByEmail(data.email);
    const compareResult = compare(data.password, user.password);

    return compareResult;
  }
}
