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
 
@Controller('pulseira')
export class PulseiraController {
    constructor(private readonly pulseiraService:PulseiraService ){ }

    @UseGuards(JwtWebAuthGuard)
    @Post()
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
    @Get(':id')
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
