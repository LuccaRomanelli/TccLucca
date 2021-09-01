import { 
    Controller, 
    Get,
    Post,
    Put,
    Delete,
    Body,
    HttpException, 
    Param,
    UseGuards,
    Req} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UserService } from '../Service';
import { CreateUserDTO, UpdateUserDTO, UserIdPath } from '../Models';
import { UserEntity } from '../Entity';
import { JwtWebAuthGuard, JwtWebAdminAuthGuard } from 'src/auth/Guard';
import { RolesEnum } from 'src/auth/Enums';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
 
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService ){ }

    @UseGuards(JwtWebAdminAuthGuard)
    @Post()
    @ApiTags('user')
    @ApiResponse({ 
        status: 201, 
        description: 'Pulseira criada',
        type: UserEntity
        })
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

    @UseGuards(JwtWebAuthGuard)
    @Put(':id')
    @ApiTags('user')
    @ApiResponse({ 
        status: 201, 
        description: 'Pulseora criada',
        type: UserEntity
        })
    async updateUser( @Param() userId:UserIdPath, @Body() userToUpdate:UpdateUserDTO, @Req() req ):Promise<UpdateResult>{
        try{
            if(!Object.keys(userToUpdate).length){
                throw new HttpException("Nada para atualizar", 400) 
            }
            const CurrentUser = req.user as UserEntity
            const IsAdmin = CurrentUser.role === RolesEnum.ADMIN ? true : false

            if(CurrentUser.id !== Number(userId.id)){
                if(!IsAdmin){
                    throw new HttpException('Permissões insuficientes', 403)
                }
            }

            const Response= await this.userService.updateUserById(userId, userToUpdate, IsAdmin);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @UseGuards(JwtWebAdminAuthGuard)
    @Get()
    @ApiTags('user')
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

    @UseGuards(JwtWebAdminAuthGuard)
    @Get(':id')
    @ApiTags('user')
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

    @UseGuards(JwtWebAdminAuthGuard)
    @Delete(':id')
    @ApiTags('user')
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
