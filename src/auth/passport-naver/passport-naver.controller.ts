import { AuthPayload } from '@auth/auth.dto';
import { Public } from '@common/public.decorator';
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
  @Public()
  @HttpCode(200)
  @UseGuards(AuthGuard('naver'))
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('oauth')
  @Public()
  @HttpCode(200)
  @UseGuards(AuthGuard('naver'))
  async kakaoLoginCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.naverService.login(req.user as AuthPayload, res);
  }
}
