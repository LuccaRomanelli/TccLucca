import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/Services';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { UserEntity } from '../Entity';
import { CreateUserDTO, UpdateUserDTO, UserIdPath } from '../Models';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        @Inject(forwardRef(()=>AuthService))
        private readonly authService:AuthService
      ) {}

    async createUser( newUser:CreateUserDTO ):Promise<UserEntity>{
        try {
            newUser.password = await this.authService.hashPassword(newUser.password);
            const Response = await this.usersRepository.save(newUser);
            return Response;
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async updateUserById( userId:UserIdPath, userToUpdate:UpdateUserDTO ):Promise<UpdateResult>{
        try {
            const Response = await this.usersRepository.update(userId.id,userToUpdate)
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getAllUsers():Promise<UserEntity[]>{
        try {
            const Response = await this.usersRepository.find()
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getUserById(userId:UserIdPath):Promise<UserEntity>{
        try {
            const Response = await this.usersRepository.findOne(userId.id)
            if(!Response){
                throw new HttpException('Usuário não encontrado',404)
            }
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getUserByEmail(userEmail:string):Promise<UserEntity>{
        try {
            const Response = await this.usersRepository.findOne({where:{email:userEmail}})
            if(!Response){
                throw new HttpException('Usuário não encontrado',404)
            }
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async deleteUserById(userId:UserIdPath):Promise<DeleteResult>{
        try {
            const Response = await this.usersRepository.delete(userId.id)
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
}
