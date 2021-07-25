import { Module } from '@nestjs/common';
import { DataService } from '../Service';
import { DataController } from '../Controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataEntity } from '../Entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataEntity])],
  providers: [DataService],
  controllers: [DataController],
})
export class DataModule {}
