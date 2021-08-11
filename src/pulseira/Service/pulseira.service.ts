import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/Services';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { PulseiraEntity } from '../Entity';
import { CreatePulseiraDTO, UpdatePulseiraDTO, PulseiraIdPath } from '../Models';

@Injectable()
export class PulseiraService {

    constructor(
        @InjectRepository(PulseiraEntity)
        private readonly pulseirasRepository: Repository<PulseiraEntity>,
      ) {}

    async createPulseira( newPulseira:CreatePulseiraDTO ):Promise<PulseiraEntity>{
        try {
            const Response = await this.pulseirasRepository.save(newPulseira);
            return Response;
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async updatePulseiraById( pulseiraId:PulseiraIdPath, pulseiraToUpdate:UpdatePulseiraDTO ):Promise<UpdateResult>{
        try {
            const Response = await this.pulseirasRepository.update(pulseiraId.id,pulseiraToUpdate)
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getAllPulseiras():Promise<PulseiraEntity[]>{
        try {
            const Response = await this.pulseirasRepository.find()
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getPulseiraById(pulseiraId:PulseiraIdPath):Promise<PulseiraEntity>{
        try {
            const Response = await this.pulseirasRepository.findOne(pulseiraId.id)
            if(!Response){
                throw new HttpException('Pulseira não encontrado',404)
            }
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async deletePulseiraById(pulseiraId:PulseiraIdPath):Promise<DeleteResult>{
        try {
            const Response = await this.pulseirasRepository.delete(pulseiraId.id)
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
}
