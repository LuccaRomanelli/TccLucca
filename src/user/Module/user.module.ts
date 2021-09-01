import { forwardRef, Module } from '@nestjs/common';
import { UserService } from '../Service';
import { UserController } from '../Controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entity';
import { AuthModule } from 'src/auth';
import { SendGridService } from '../../utils';

@Module({
  imports: [
    forwardRef(()=>AuthModule),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserService, SendGridService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
