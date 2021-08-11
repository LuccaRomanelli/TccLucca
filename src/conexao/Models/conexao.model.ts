
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Validate } from 'class-validator';


export class CreateConexaoDTO {  
    @IsNotEmpty()
    @ApiProperty()
    pulseiraFk: number;
  
    @IsNotEmpty()
    @ApiProperty()
    pacienteFk: number;
  
}

export class UpdateConexaoDTO {
    @IsNotEmpty()
    @ApiProperty()
    pulseiraFk: number;
  
    @IsNotEmpty()
    @ApiProperty()
    pacienteFk: number;
  
    @IsNotEmpty()
    @ApiProperty()
    dataInicio: Date;
  
    @IsNotEmpty()
    @ApiProperty()
    dataFim: Date;
}

export class ConexaoIdPath {
    @IsNumberString()
    @ApiProperty()
    id: number;
}

export class ConexaoPacientePath {
    @IsNumberString()
    @ApiProperty()
    pacienteFk: number;
}
