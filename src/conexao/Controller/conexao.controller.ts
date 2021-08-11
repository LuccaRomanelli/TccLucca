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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
 
@Controller('conexao')
export class ConexaoController {
    constructor(private readonly conexaoService:ConexaoService ){ }

    @UseGuards(JwtWebAuthGuard)
    @Post()
    @ApiTags('conexao')
    @ApiResponse({ 
        status: 201, 
        description: 'Conexao criada',
        type: ConexaoEntity
        })
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
    @ApiTags('conexao')
    @ApiResponse({ 
        status: 201, 
        description: 'Conexao finalizada',
        type: ConexaoEntity
        })
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
    @ApiTags('conexao')
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
    @ApiTags('conexao')
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
    @ApiTags('conexao')
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
    @ApiTags('conexao')
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
