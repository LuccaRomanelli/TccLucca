
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';


export class CreatePulseiraDTO {
    @IsNotEmpty()
    @ApiProperty()
    status: string;

    @IsNotEmpty()
    @ApiProperty()
    node: string;
}

export class UpdatePulseiraDTO {
    @IsNotEmpty()
    @ApiProperty()
    status: string;

    @IsNotEmpty()
    @ApiProperty()
    node: string;
}

export class PulseiraIdPath {
    @IsNumberString()
    @ApiProperty()
    id: number;
}