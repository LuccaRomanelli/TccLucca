import { forwardRef, Module } from '@nestjs/common';
import { PulseiraService } from '../Service';
import { PulseiraController } from '../Controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PulseiraEntity } from '../Entity';
import { AuthModule } from 'src/auth';

@Module({
  imports: [
    forwardRef(()=>AuthModule),
    TypeOrmModule.forFeature([PulseiraEntity])
  ],
  providers: [PulseiraService],
  controllers: [PulseiraController],
  exports: [PulseiraService]
})
export class PulseiraModule {}
