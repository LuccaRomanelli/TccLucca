import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PacienteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  idade: number;

  @Column()
  sexo: string;

  @Column()
  telefone: string;

  @Column()
  contatoEmergencia: string;

  @Column()
  telefoneEmergencia: string;

  @Column()
  cpf: string;

  @Column()
  sintomas: string;

  @Column()
  historico: string;

}