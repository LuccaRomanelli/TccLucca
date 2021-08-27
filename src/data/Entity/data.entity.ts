import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DataEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  node: string;

  @Column()
  @ApiProperty()
  time_utc: Date;

  @Column()
  @ApiProperty()
  seqno: string;

  @Column()
  @ApiProperty()
  rssi: string;

  @Column()
  @ApiProperty()
  snr: string;

  @Column()
  @ApiProperty()
  senStatus: string;

  @Column()
  @ApiProperty()
  heart_Rate: string;

  @Column()
  @ApiProperty()
  temperature_degC: string;

  @Column()
  @ApiProperty()
  oximetry: string;

  @Column()
  @ApiProperty()
  position: string;

}