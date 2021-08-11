
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty} from 'class-validator';
import { UserEntity } from 'src/user';

export class CredentialsDTO {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'O email do usuario',
        default: ''
    })
    email: string;

    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'A senha do usuario',
        default: ''
    })
    password: string;
}

export interface CredentialsResponseDTO {
    user:UserEntity;
    accessToken:string;
    expiresIn:number;
}
