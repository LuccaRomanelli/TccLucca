import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { JWTWebPayload } from '../Models';
import { AuthService } from '../Services';
import { RolesEnum } from '../Enums';

@Injectable()
export class JwtWebAdminStrategy extends PassportStrategy(Strategy,'JwtWebAdminStrategy') {
  constructor(
      private readonly authService:AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SCRET_KEY_WEB,
    });
  }

  async validate(payload: JWTWebPayload) {
    try {
        const User = await this.authService.validateUserJWT({email:payload.email,password:payload.password});
        if(User.role !== RolesEnum.ADMIN){
          throw new HttpException('Permissões insuficientes', 403)
        }
        return User;
    } catch (err){
        if (err instanceof HttpException) {
            throw err
        }                 
        throw new HttpException(err.message, 400)
    }  
  }
}