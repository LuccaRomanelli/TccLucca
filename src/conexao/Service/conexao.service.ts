import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ConexaoEntity } from '../Entity';
import { CreateConexaoDTO, UpdateConexaoDTO, ConexaoIdPath, ConexaoPacientePath } from '../Models';

@Injectable()
export class ConexaoService {

    constructor(
        @InjectRepository(ConexaoEntity)
        private readonly conexaosRepository: Repository<ConexaoEntity>,
    ) {}

    async createConexao( newConexao:ConexaoEntity ):Promise<ConexaoEntity>{
        try {
            newConexao.dataInicio = new Date();
            const Response = await this.conexaosRepository.save(newConexao);
            return Response;
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async updateConexaoById( conexaoId:ConexaoIdPath):Promise<UpdateResult>{
        try {
            const Conexao = await this.getConexaoById(conexaoId);
            Conexao.dataFim = new Date();
            const Response = await this.conexaosRepository.update(Conexao.id,Conexao)
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getAllConexaos():Promise<ConexaoEntity[]>{
        try {
            const Response = await this.conexaosRepository.find()
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getLastConexaoByIdPaciente(conexaoPacienteId:ConexaoPacientePath):Promise<ConexaoEntity>{
        try {
            const Response = await this.conexaosRepository.findOne({
                where: {
                    pacienteFk: conexaoPacienteId.pacienteFk,
                    dataFim: null
                }
            })
            if(!Response){
                throw new HttpException('Sem conexao aberta para esse paciente',404)
            }
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getConexaoById(conexaoId:ConexaoIdPath):Promise<ConexaoEntity>{
        try {
            const Response = await this.conexaosRepository.findOne(conexaoId.id)
            if(!Response){
                throw new HttpException('Sem conexao para esse Id',404)
            }
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async deleteConexaoById(conexaoId:ConexaoIdPath):Promise<DeleteResult>{
        try {
            const Response = await this.conexaosRepository.delete(conexaoId.id)
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
}
