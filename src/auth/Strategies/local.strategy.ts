import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../Services/auth.service';
import { UserEntity } from '../../user/Entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        usernameField:'email'
    });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    try {
        const User = await this.authService.validateUser({email, password});
        return User;
    } catch (err){
        if (err instanceof HttpException) {
            throw err
        }                 
        throw new HttpException(err.message, 400)
    }   
  }
}