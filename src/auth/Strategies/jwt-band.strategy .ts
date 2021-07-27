import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { JWTBandPayload } from '../Module';
import { AuthService } from '../Services';

@Injectable()
export class JwtBandStrategy extends PassportStrategy(Strategy) {
  constructor(
      private readonly authService:AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SCRET_KEY_BAND,
    });
  }

  async validate(payload: JWTBandPayload) {
    try {
        return payload;
    } catch (err){
        if (err instanceof HttpException) {
            throw err
        }                 
        throw new HttpException(err.message, 400)
    }  
  }
}