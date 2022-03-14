import { Module } from '@nestjs/common';
import { PassportNaverController } from './passport-naver.controller';
import { PassportNaverService } from './passport-naver.service';
import { PassportNaverStrategy } from './passport-naver.strategy';

@Module({
  providers: [PassportNaverStrategy, PassportNaverService],
  controllers: [PassportNaverController],
})
export class PassportNaverModule {}
