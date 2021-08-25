import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataEntity } from '../Entity';
import { CreateDataDTO, DataIdPath } from '../Models';
import { Between } from "typeorm";

@Injectable()
export class DataService {

    constructor(
        @InjectRepository(DataEntity)
        private readonly dataRepository: Repository<DataEntity>,
      ) {}

    async createData( newData:CreateDataDTO ):Promise<DataEntity>{
        try {
            newData.time_utc = new Date()
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
    async getDataById(dataId:DataIdPath,dataInicio:number,dataFim:number):Promise<DataEntity[]>{
        try {
            console.log(new Date(dataInicio).toISOString())
            console.log(new Date(dataFim).toISOString())
            const Response = await this.dataRepository.find({
                where: {
                    node: dataId.node,
                    time_utc: Between(new Date(dataInicio).toISOString(), new Date(dataFim).toISOString()), 
                }
            })
            console.log(Response)
            if(!Response.length){
                throw new HttpException('Dado não encontrado',404)
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