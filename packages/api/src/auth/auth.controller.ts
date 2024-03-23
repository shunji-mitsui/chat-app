import { Controller, Req, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(
    @Req() req: any,
    @Body() body: { email: string; password: string; name: string },
  ): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('signin')
  signIn(
    @Body() body: { email: string; password: string; name: string },
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(body);
  }

  @Get('signout')
  @UseGuards(AuthGuard)
  signOut(@Req() req: any): Promise<void> {
    return this.authService.signOut(req.user.userId);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: any): Promise<{ userName: string }> {
    return this.authService.me(req.user.userId);
  }
}
