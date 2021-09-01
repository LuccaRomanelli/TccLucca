import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user';
import { AuthController } from '../Controller';
import { AuthService } from '../Services';
import { PassportModule } from '@nestjs/passport';
import { JwtBandStrategy, JwtWebStrategy, LocalStrategy, JwtWebAdminStrategy } from '../Strategies'
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  imports: [
    forwardRef(()=>UserModule),
    PassportModule,
    JwtModule.register({
      secret:process.env.JWT_SCRET_KEY_WEB,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRES_IN_WEB)
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtWebStrategy, JwtBandStrategy, JwtWebAdminStrategy],
  exports: [AuthService]
})
export class AuthModule {}
