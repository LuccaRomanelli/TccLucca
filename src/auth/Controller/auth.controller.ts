import { Controller, Post, HttpException, HttpCode, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../Services';
import { CredentialsResponseDTO } from '../Models'
import { JwtWebAuthGuard, LocalAuthGuard } from '../Guard'
import { ApiBody, ApiTags, getSchemaPath } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService ){ }

    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @ApiTags('auth')   
    @Post('login')
    async login(@Request() req):Promise<CredentialsResponseDTO>{
        try{
            const Response= await this.authService.login(req.user);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @UseGuards(JwtWebAuthGuard)
    @HttpCode(200)
    @ApiTags('auth')
    @Post('refresh')
    async refresh(@Request() req):Promise<CredentialsResponseDTO>{
        try{
            const Response= await this.authService.refresh(req.user);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

}
