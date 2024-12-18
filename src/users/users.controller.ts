import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { AssignUserDto } from './dtos/assign-user.dto';
import { UsersService } from './users.service';
import { BulkAssignUserDto } from './dtos/bulk-assign-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('assign')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  async assignUserToOrg(@Body() body: AssignUserDto) {
    return this.usersService.assignUserToOrg(body.userId, body.orgId);
  }

  @Post('assign-bulk')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  async bulkAssignUsersToOrg(@Body() body: BulkAssignUserDto) {
    return this.usersService.bulkAssignUserToOrg(body.userIds, body.orgId);
  }

  @Get('no-org')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  async getAllUsersWithoutOrganization() {
    return this.usersService.getAllUsersWithoutOrganization();
  }
}
