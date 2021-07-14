import { Module } from '@nestjs/common';
import { UserService } from '../Service';
import { UserController } from '../Controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
