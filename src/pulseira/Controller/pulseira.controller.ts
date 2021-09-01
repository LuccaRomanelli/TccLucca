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
import { PulseiraService } from '../Service';
import { CreatePulseiraDTO, UpdatePulseiraDTO, PulseiraIdPath } from '../Models';
import { PulseiraEntity } from '../Entity';
import { JwtWebAuthGuard } from 'src/auth/Guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
 
@Controller('pulseira')
export class PulseiraController {
    constructor(private readonly pulseiraService:PulseiraService ){ }

    @UseGuards(JwtWebAuthGuard)
    @Post()
    @ApiTags('pulseira')
    @ApiResponse({ 
        status: 201, 
        description: 'Pulseora criada',
        type: PulseiraEntity
        })
    async createPulseira(@Body() newPulseira:CreatePulseiraDTO ):Promise<PulseiraEntity>{
        try{
            const Response= await this.pulseiraService.createPulseira(newPulseira);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @UseGuards(JwtWebAuthGuard)
    @ApiTags('pulseira')
    @ApiResponse({ 
        status: 201, 
        description: 'Pulseora editada',
        type: PulseiraEntity
        })
    @Put(':id')
    async updatePulseira( @Param() pulseiraId:PulseiraIdPath, @Body() pulseiraToUpdate:UpdatePulseiraDTO ):Promise<UpdateResult>{
        try{
            if(!Object.keys(pulseiraToUpdate).length){
                throw new HttpException("Nada para atualizar", 400) 
            }
            const Response= await this.pulseiraService.updatePulseiraById(pulseiraId, pulseiraToUpdate);
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
    @ApiTags('pulseira')
    async getAllPulseira():Promise<PulseiraEntity[]>{
        try{
            const Response= await this.pulseiraService.getAllPulseiras();
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

    @UseGuards(JwtWebAuthGuard)
    @Get('/disponivel/')
    @ApiTags('pulseira')
    async getAllPulseiraDisponiveis():Promise<PulseiraEntity[]>{
        try{
            const Response= await this.pulseiraService.getAllPulseirasDisponiveis();
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
    @ApiTags('pulseira')
    async getPulseiraById( @Param() pulseiraId:PulseiraIdPath):Promise<PulseiraEntity>{
        try{
            const Response= await this.pulseiraService.getPulseiraById(pulseiraId);
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
    @ApiTags('pulseira')
    async deletePulseiraById( @Param() pulseiraId:PulseiraIdPath):Promise<DeleteResult>{
        try{
            const Response= await this.pulseiraService.deletePulseiraById(pulseiraId);
            return Response
        } catch (err) {
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }

}
