import { Controller, Get, HttpException } from '@nestjs/common';
import { AuthService } from '../Services';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService ){ }

    @Get('teste')
    teste():string{
        try{
            const Response=this.authService.teste();
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }



}
