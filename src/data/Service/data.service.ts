import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { DataEntity } from '../Entity';
import { CreateDataDTO, DataIdPath } from '../Models';

@Injectable()
export class DataService {

    constructor(
        @InjectRepository(DataEntity)
        private readonly dataRepository: Repository<DataEntity>,
      ) {}

    async createData( newData:CreateDataDTO ):Promise<DataEntity>{
        try {
            const Response = await this.dataRepository.save(newData)
            return Response;
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getAllDatas():Promise<DataEntity[]>{
        try {
            const Response = await this.dataRepository.find()
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getDataById(dataId:DataIdPath):Promise<DataEntity>{
        try {
            const Response = await this.dataRepository.findOne({where: {node:dataId}})
            if(!Response){
                throw new HttpException('Usuário não encontrado',404)
            }
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
}
