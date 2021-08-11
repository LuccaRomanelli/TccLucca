import { forwardRef, Module } from '@nestjs/common';
import { PacienteService } from '../Service';
import { PacienteController } from '../Controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteEntity } from '../Entity';
import { AuthModule } from 'src/auth';

@Module({
  imports: [
    forwardRef(()=>AuthModule),
    TypeOrmModule.forFeature([PacienteEntity])
  ],
  providers: [PacienteService],
  controllers: [PacienteController],
  exports: [PacienteService]
})
export class PacienteModule {}
