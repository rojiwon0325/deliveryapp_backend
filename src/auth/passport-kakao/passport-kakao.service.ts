import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportType } from '@user/user.entity';
import { UserService } from '@user/user.service';
import { Response } from 'express';
import { KakaoPayload } from './passport-kakao.dto';

@Injectable()
export class PassportKakaoService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async login({ kakao_id, ...rest }: KakaoPayload, res: Response) {
    try {
      const payload = await this.userService.readOrCreateByPassport({
        passport_id: kakao_id + '',
        passport_type: PassportType.Kakao,
        ...rest,
      });
      const token = this.jwtService.sign(payload);
      res.cookie('jwt', token, { httpOnly: true });
      return res.redirect('http://localhost:3000');
    } catch {
      return res.redirect('http://localhost:3000/auth/fail');
    }
  }
  logout() {
    return null;
  }
  withdrawal() {
    return null;
  }
}
