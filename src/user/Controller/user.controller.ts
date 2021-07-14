import { 
    Controller, 
    Get,
    Post,
    Put,
    Delete,
    Body,
    HttpException, 
    Param} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UserService } from '../Service';
import { CreateUserDTO, UpdateUserDTO, UserIdPath } from '../Models';
import { UserEntity } from '../Entity';
 
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService ){ }

    @Post()
    async createUser(@Body() newUser:CreateUserDTO ):Promise<UserEntity>{
        try{
            const Response= await this.userService.createUser(newUser);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @Put(':id')
    async updateUser( @Param() userId:UserIdPath, @Body() userToUpdate:UpdateUserDTO ):Promise<UpdateResult>{
        try{
            if(!Object.keys(userToUpdate).length){
                throw new HttpException("Nada para atualizar", 400) 
            }
            const Response= await this.userService.updateUserById(userId, userToUpdate);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @Get()
    async getAllUser():Promise<UserEntity[]>{
        try{
            const Response= await this.userService.getAllUsers();
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @Get(':id')
    async getUserById( @Param() userId:UserIdPath):Promise<UserEntity>{
        try{
            const Response= await this.userService.getUserById(userId);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @Delete(':id')
    async deleteUserById( @Param() userId:UserIdPath):Promise<DeleteResult>{
        try{
            const Response= await this.userService.deleteUserById(userId);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

}
