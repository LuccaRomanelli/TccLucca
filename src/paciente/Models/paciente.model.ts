
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Validate } from 'class-validator';
import { ValidarCpf } from '../../utils/custom-validators';


export class CreatePacienteDTO {
    @IsNotEmpty()
    @ApiProperty()
    nome: string;
  
    @IsNotEmpty()
    @ApiProperty()
    idade: number;
  
    @IsNotEmpty()
    @ApiProperty()
    sexo: string;
  
    @IsNotEmpty()
    @ApiProperty()
    telefone: string;
  
    @IsNotEmpty()
    @ApiProperty()
    contatoEmergencia: string;
  
    @IsNotEmpty()
    @ApiProperty()
    telefoneEmergencia: string;
  
    @IsNotEmpty()
    @ApiProperty()
    @Validate(ValidarCpf)
    cpf: string;
  
    @IsNotEmpty()
    @ApiProperty()
    sintomas: string;
  
    @IsNotEmpty()
    @ApiProperty()
    historico: string;
}

export class UpdatePacienteDTO {
    @IsNotEmpty()
    @ApiProperty()
    nome: string;
  
    @IsNotEmpty()
    @ApiProperty()
    idade: number;
  
    @IsNotEmpty()
    @ApiProperty()
    sexo: string;
  
    @IsNotEmpty()
    @ApiProperty()
    telefone: string;
  
    @IsNotEmpty()
    @ApiProperty()
    contatoEmergencia: string;
  
    @IsNotEmpty()
    @ApiProperty()
    telefoneEmergencia: string;
  
    @IsNotEmpty()
    @Validate(ValidarCpf)
    @ApiProperty()
    cpf: string;
  
    @IsNotEmpty()
    @ApiProperty()
    sintomas: string;
  
    @IsNotEmpty()
    @ApiProperty()
    historico: string;
}

export class PacienteIdPath {
    @IsNumberString()
    @ApiProperty()
    id: number;
}