import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { KakaoPayload } from './passport-kakao.dto';

export class PassportKakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENTID,
      callbackURL: process.env.KAKAO_REDIRECT_URL,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const profileJson = profile._json;
    const kakao_account = profileJson.kakao_account;
    const payload: KakaoPayload = {
      id: profileJson.id,
      username: kakao_account.profile.nickname,
      email: kakao_account.email ?? null,
      access_token: accessToken ?? null,
      refresh_token: refreshToken ?? null,
    };
    done(null, payload);
  }
}
