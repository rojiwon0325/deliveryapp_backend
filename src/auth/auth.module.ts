import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@user/user.module';
import { KakaoStrategy } from './kakao.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIREIN,
      },
    }),
  ],
  providers: [AuthService, KakaoStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
