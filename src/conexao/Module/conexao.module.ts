import { forwardRef, Module } from '@nestjs/common';
import { ConexaoService } from '../Service';
import { ConexaoController } from '../Controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConexaoEntity } from '../Entity';
import { AuthModule } from 'src/auth';

@Module({
  imports: [
    forwardRef(()=>AuthModule),
    TypeOrmModule.forFeature([ConexaoEntity])
  ],
  providers: [ConexaoService],
  controllers: [ConexaoController],
  exports: [ConexaoService]
})
export class ConexaoModule {}
