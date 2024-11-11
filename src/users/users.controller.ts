import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { AssignUserDto } from './dtos/assign-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  async assignUserToOrg(@Body() body: AssignUserDto) {
    return this.usersService.assignUserToOrg(body.userId, body.orgId);
  }
}
