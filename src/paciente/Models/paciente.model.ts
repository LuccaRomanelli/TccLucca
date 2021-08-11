
import { IsNotEmpty, IsNumberString, Validate } from 'class-validator';
import { ValidarCpf } from '../../utils/custom-validators';


export class CreatePacienteDTO {
    @IsNotEmpty()
    nome: string;
  
    @IsNotEmpty()
    idade: number;
  
    @IsNotEmpty()
    sexo: string;
  
    @IsNotEmpty()
    telefone: string;
  
    @IsNotEmpty()
    contatoEmergencia: string;
  
    @IsNotEmpty()
    telefoneEmergencia: string;
  
    @IsNotEmpty()
    @Validate(ValidarCpf)
    cpf: string;
  
    @IsNotEmpty()
    sintomas: string;
  
    @IsNotEmpty()
    historico: string;
}

export class UpdatePacienteDTO {
    @IsNotEmpty()
    nome: string;
  
    @IsNotEmpty()
    idade: number;
  
    @IsNotEmpty()
    sexo: string;
  
    @IsNotEmpty()
    telefone: string;
  
    @IsNotEmpty()
    contatoEmergencia: string;
  
    @IsNotEmpty()
    telefoneEmergencia: string;
  
    @IsNotEmpty()
    @Validate(ValidarCpf)
    cpf: string;
  
    @IsNotEmpty()
    sintomas: string;
  
    @IsNotEmpty()
    historico: string;
}

export class PacienteIdPath {
    @IsNumberString()
    id: number;
}