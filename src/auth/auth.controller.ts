import { Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';

@ApiTags('auth common')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout({ res });
  }
}
