import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PacienteEntity } from '../../paciente/Entity';
import { PulseiraEntity } from '../../pulseira/Entity';

@Entity()
export class ConexaoEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id?: number;

  @ManyToOne(() => PulseiraEntity)
  @JoinColumn()
  @ApiProperty()
  pulseiraFk: number;

  @ManyToOne(() => PacienteEntity)
  @JoinColumn()
  @ApiProperty()
  pacienteFk: number;

  @Column()
  @ApiProperty()
  dataInicio?: Date;

  @Column({nullable: true})
  @ApiProperty()
  dataFim?: Date;

}