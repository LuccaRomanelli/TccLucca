import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PulseiraEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  node: string;

  @Column()
  status: string;

}