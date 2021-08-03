import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  node: string;

  @Column()
  time_utc: string;

  @Column()
  seqno: string;

  @Column()
  rssi: string;

  @Column()
  snr: string;

  @Column()
  senStatus: string;

  @Column()
  heart_Rate: string;

  @Column()
  temperature_degC: string;

  @Column()
  oximetry: string;

  @Column()
  blood_pressure: string;

}