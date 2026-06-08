import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'VERIDIT_SUPER_SECRET_KEY_2026', // Em produção, isso deve vir do .env
    });
  }

  async validate(payload: any) {
    // O retorno deste método é injetado automaticamente no objeto `req.user`
    return { 
      sub: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}