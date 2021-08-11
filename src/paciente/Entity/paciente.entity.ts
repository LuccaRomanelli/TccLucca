import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PacienteEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  nome: string;

  @Column()
  @ApiProperty()
  idade: number;

  @Column()
  @ApiProperty()
  sexo: string;

  @Column()
  @ApiProperty()
  telefone: string;

  @Column()
  @ApiProperty()
  contatoEmergencia: string;

  @Column()
  @ApiProperty()  
  telefoneEmergencia: string;

  @Column()
  @ApiProperty()
  cpf: string;

  @Column()
  @ApiProperty()
  sintomas: string;

  @Column()
  @ApiProperty()
  historico: string;

}