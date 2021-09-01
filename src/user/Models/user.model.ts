
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';


export class CreateUserDTO {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsOptional()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    role: string;
}

export class UpdateUserDTO {
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email: string;

    @IsOptional()
    @ApiProperty()
    password: string;

    @IsOptional()
    @ApiProperty()
    role: string;
}

export class UserIdPath {
    @IsNumberString()
    @ApiProperty()
    id: number;
}