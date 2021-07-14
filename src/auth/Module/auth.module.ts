import { Module } from '@nestjs/common';
import { AuthController } from '../Controller';
import { AuthService } from '../Services';

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
