import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('search/:userId')
  @UseGuards(AuthGuard)
  async findUserById(@Param('userId') userId: string) {
    const user = await this.userService.findUserById(userId);
    return { user };
  }
}
