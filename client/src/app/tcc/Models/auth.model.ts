import { UserDTO } from './user.model'

export interface CredentialsDTO{
    email:string;
    password:string;
}

export interface LoginResponseDTO{
    expiresIn:number;
    user:UserDTO;
    accessToken:string;
}
