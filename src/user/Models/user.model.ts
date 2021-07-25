
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';


export class CreateUserDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: string;
}

export class UpdateUserDTO {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    password: string;

    @IsOptional()
    role: string;
}

export class UserIdPath {
    @IsNumberString()
    id: number;
}