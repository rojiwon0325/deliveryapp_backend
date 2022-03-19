import { PassportService } from '@auth/passport/passport.service';
import { Module } from '@nestjs/common';
import { PassportNaverController } from './passport-naver.controller';
import { PassportNaverStrategy } from './passport-naver.strategy';

@Module({
  providers: [PassportNaverStrategy, PassportService],
  controllers: [PassportNaverController],
})
export class PassportNaverModule {}
