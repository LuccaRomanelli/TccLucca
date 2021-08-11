
import { IsNotEmpty, IsNumberString, Validate } from 'class-validator';


export class CreateConexaoDTO {  
    @IsNotEmpty()
    pulseiraFk: number;
  
    @IsNotEmpty()
    pacienteFk: number;
  
}

export class UpdateConexaoDTO {
    @IsNotEmpty()
    pulseiraFk: number;
  
    @IsNotEmpty()
    pacienteFk: number;
  
    @IsNotEmpty()
    dataInicio: Date;
  
    @IsNotEmpty()
    dataFim: Date;
}

export class ConexaoIdPath {
    @IsNumberString()
    id: number;
}

export class ConexaoPacientePath {
    @IsNumberString()
    pacienteFk: number;
}
