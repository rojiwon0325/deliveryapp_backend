import { AuthPayload } from '@auth/auth.dto';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { PassportNaverService } from './passport-naver.service';

@Controller()
export class PassportNaverController {
  constructor(private readonly naverService: PassportNaverService) {}
  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard('naver'))
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('oauth')
  @HttpCode(200)
  @UseGuards(AuthGuard('naver'))
  async kakaoLoginCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.naverService.login(req.user as AuthPayload, res);
  }
}
