import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { CredentialsDTO, CredentialsResponseDTO } from '../Models'
import { UserEntity } from '../../user/Entity'
import { UserService } from 'src/user/Service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWTWebPayload } from '../Module';

@Injectable()
export class AuthService {
    private readonly SaltRounds = 10;
    constructor(
        @Inject(forwardRef(()=>UserService))
        private readonly userService:UserService,
        private readonly jwtService:JwtService,
    ){}
    async validateUser(credentials:CredentialsDTO):Promise<UserEntity>{
        try {
            const CurrentUser = await this.userService.getUserByEmail(credentials.email);
            if(!await this.comparePassword(credentials.password,CurrentUser.password)){
                throw new HttpException('Login invalido', 401)
            }
            return CurrentUser
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    async validateUserJWT(credentials:CredentialsDTO):Promise<UserEntity>{
        try {
            const CurrentUser = await this.userService.getUserByEmail(credentials.email);
            if(credentials.password !== CurrentUser.password){
                throw new HttpException('Token invalido', 401)
            }
            return CurrentUser
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }


    async login(user:UserEntity):Promise<CredentialsResponseDTO>{
        try {
            const Payload:JWTWebPayload = {...user};
            delete user.password;
            const Token = await this.jwtService.sign(Payload);
            const Response:CredentialsResponseDTO = {
                expiresIn: Number(process.env.JWT_EXPIRES_IN_WEB),
                user:user,
                accessToken: Token
            };

            return Response;

        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }      
    }

    async refresh(user:UserEntity):Promise<CredentialsResponseDTO>{
        try {
            const Payload:JWTWebPayload = {...user};
            delete user.password;
            const Token = await this.jwtService.sign(Payload);
            const Response:CredentialsResponseDTO = {
                expiresIn: Number(process.env.JWT_EXPIRES_IN_WEB),
                user:user,
                accessToken: Token
            };

            return Response;

        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }      
    }

    async hashPassword(password:string):Promise<string>{
        try {
            const HashedPassword = await bcrypt.hash(password,this.SaltRounds);
            return HashedPassword
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    async comparePassword(password:string, hashedPassword:string):Promise<boolean>{
        try {
            const PasswordEqual = await bcrypt.compare(password,hashedPassword);
            return PasswordEqual
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        } 
    }


}
