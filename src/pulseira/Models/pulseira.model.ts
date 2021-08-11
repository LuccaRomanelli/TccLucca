
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';


export class CreatePulseiraDTO {
    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    node: string;
}

export class UpdatePulseiraDTO {
    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    node: string;
}

export class PulseiraIdPath {
    @IsNumberString()
    id: number;
}