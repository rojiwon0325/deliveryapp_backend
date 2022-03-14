import { AuthPayload } from '@auth/auth.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportType } from '@user/user.entity';
import { UserService } from '@user/user.service';
import { Response } from 'express';

@Injectable()
export class PassportNaverService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async login(payload: AuthPayload, res: Response) {
    try {
      const jwtpayload = await this.userService.readOrCreateByPassport({
        passport_type: PassportType.Naver,
        ...payload,
      });
      const token = this.jwtService.sign(jwtpayload);
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
