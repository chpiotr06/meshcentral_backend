import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  @Post('login')
  async loginUser(@Body() body: LoginUserDto) {
    return this.authService.loginUser(body);
  }
}
