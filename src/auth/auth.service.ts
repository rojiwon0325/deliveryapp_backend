import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { KakaoPayload } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  kakaoLogin(payload: KakaoPayload) {
    // kakao passport를 통해 얻어온 정보를 통해 유저를 찾아
    // jwt 토큰을 발급하여 로그인
    // 리턴이 아닌 쿠키 해더를 통해 전달
    console.log(typeof payload.kakaoId);
    return { access_token: payload.username };
  }
}
