import { 
    Controller, 
    Get,
    Post,
    Put,
    Delete,
    Body,
    HttpException, 
    Param,
    UseGuards} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ConexaoService } from '../Service';
import { CreateConexaoDTO, UpdateConexaoDTO, ConexaoIdPath, ConexaoPacientePath } from '../Models';
import { ConexaoEntity } from '../Entity';
import { JwtWebAuthGuard } from 'src/auth/Guard';
 
@Controller('conexao')
export class ConexaoController {
    constructor(private readonly conexaoService:ConexaoService ){ }

    @UseGuards(JwtWebAuthGuard)
    @Post()
    async createConexao(@Body() newConexao:CreateConexaoDTO ):Promise<ConexaoEntity>{
        try{
            const Response= await this.conexaoService.createConexao(newConexao);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @UseGuards(JwtWebAuthGuard)
    @Put(':pacienteFk')
    async updateConexao( @Param() conexaoPaciente:ConexaoPacientePath ):Promise<UpdateResult>{
        try{
            const Response= await this.conexaoService.updateConexaoByIdPaciente(conexaoPaciente);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @UseGuards(JwtWebAuthGuard)
    @Get()
    async getAllConexao():Promise<ConexaoEntity[]>{
        try{
            const Response= await this.conexaoService.getAllConexaos();
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @UseGuards(JwtWebAuthGuard)
    @Get('/paciente/:pacienteFk')
    async getLastConexaoByPaciente( @Param() conexaoPaciente:ConexaoPacientePath):Promise<ConexaoEntity>{
        try{
            const Response= await this.conexaoService.getLastConexaoByIdPaciente(conexaoPaciente);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @UseGuards(JwtWebAuthGuard)
    @Get(':id')
    async getConexaoById( @Param() conexaoId:ConexaoIdPath):Promise<ConexaoEntity>{
        try{
            const Response= await this.conexaoService.getConexaoById(conexaoId);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @UseGuards(JwtWebAuthGuard)
    @Delete(':id')
    async deleteConexaoById( @Param() conexaoId:ConexaoIdPath):Promise<DeleteResult>{
        try{
            const Response= await this.conexaoService.deleteConexaoById(conexaoId);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

}
