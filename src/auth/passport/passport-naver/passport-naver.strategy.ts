import { AuthPayload } from '@auth/auth.dto';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';

export class PassportNaverStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENTID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: process.env.NAVER_REDIRECT_URL,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const { id, email, nickname } = profile._json;
    const payload: AuthPayload = {
      passport_id: id,
      username: nickname,
      email: email ?? null,
      access_token: accessToken ?? null,
      refresh_token: refreshToken ?? null,
    };
    done(null, payload);
  }
}
