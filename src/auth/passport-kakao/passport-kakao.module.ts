import { Module } from '@nestjs/common';
import { PassportKakaoStrategy } from './passport-kakao.strategy';
import { PassportKakaoController } from './passport-kakao.controller';
import { PassportKakaoService } from './passport-kakao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@user/entity/user.entity';
import { Kakao } from './kakao/kakao.entity';
import { KakaoService } from './kakao/kakao.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Kakao])],
  providers: [PassportKakaoStrategy, PassportKakaoService, KakaoService],
  controllers: [PassportKakaoController],
})
export class PassportKakaoModule {}
