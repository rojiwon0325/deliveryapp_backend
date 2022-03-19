import { Module } from '@nestjs/common';
import { PassportKakaoStrategy } from './passport-kakao.strategy';
import { PassportKakaoController } from './passport-kakao.controller';
import { PassportService } from '@auth/passport/passport.service';

@Module({
  providers: [PassportKakaoStrategy, PassportService],
  controllers: [PassportKakaoController],
})
export class PassportKakaoModule {}
