import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { PacienteEntity } from '../../paciente/Entity';
import { PulseiraEntity } from '../../pulseira/Entity';

@Entity()
export class ConexaoEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => PulseiraEntity)
  @JoinColumn()
  pulseiraFk: number;

  @OneToOne(() => PacienteEntity)
  @JoinColumn()
  pacienteFk: number;

  @Column()
  dataInicio?: Date;

  @Column({nullable: true})
  dataFim?: Date;

}