
import { IsEmail, IsNotEmpty} from 'class-validator';
import { UserEntity } from 'src/user';

export class CredentialsDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}

export interface CredentialsResponseDTO {
    user:UserEntity;
    accessToken:string;
    expiresIn:number;
}
