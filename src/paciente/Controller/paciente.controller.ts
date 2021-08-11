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
import { PacienteService } from '../Service';
import { CreatePacienteDTO, UpdatePacienteDTO, PacienteIdPath } from '../Models';
import { PacienteEntity } from '../Entity';
import { JwtWebAuthGuard } from 'src/auth/Guard';
 
@Controller('paciente')
export class PacienteController {
    constructor(private readonly pacienteService:PacienteService ){ }

    @UseGuards(JwtWebAuthGuard)
    @Post()
    async createPaciente(@Body() newPaciente:CreatePacienteDTO ):Promise<PacienteEntity>{
        try{
            const Response= await this.pacienteService.createPaciente(newPaciente);
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
    async updatePaciente( @Param() pacienteId:PacienteIdPath, @Body() pacienteToUpdate:UpdatePacienteDTO ):Promise<UpdateResult>{
        try{
            if(!Object.keys(pacienteToUpdate).length){
                throw new HttpException("Nada para atualizar", 400) 
            }
            const Response= await this.pacienteService.updatePacienteById(pacienteId, pacienteToUpdate);
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
    async getAllPaciente():Promise<PacienteEntity[]>{
        try{
            const Response= await this.pacienteService.getAllPacientes();
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
    async getPacienteById( @Param() pacienteId:PacienteIdPath):Promise<PacienteEntity>{
        try{
            const Response= await this.pacienteService.getPacienteById(pacienteId);
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
    async deletePacienteById( @Param() pacienteId:PacienteIdPath):Promise<DeleteResult>{
        try{
            const Response= await this.pacienteService.deletePacienteById(pacienteId);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

}
