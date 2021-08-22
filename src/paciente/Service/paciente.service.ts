import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { PacienteEntity } from '../Entity';
import { validaCpf } from '../../utils'
import { CreatePacienteDTO, UpdatePacienteDTO, PacienteIdPath, NomePacientePath } from '../Models';

@Injectable()
export class PacienteService {

    constructor(
        @InjectRepository(PacienteEntity)
        private readonly pacientesRepository: Repository<PacienteEntity>,
      ) {}

    async createPaciente( newPaciente:CreatePacienteDTO ):Promise<PacienteEntity>{
        try {
            const Response = await this.pacientesRepository.save(newPaciente);
            return Response;
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async updatePacienteById( pacienteId:PacienteIdPath, pacienteToUpdate:UpdatePacienteDTO ):Promise<UpdateResult>{
        try {
            const Response = await this.pacientesRepository.update(pacienteId.id,pacienteToUpdate)
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getAllPacientes():Promise<PacienteEntity[]>{
        try {
            const Response = await this.pacientesRepository.find()
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getPacienteByNome(nomePacienteId:NomePacientePath):Promise<PacienteEntity>{
        try {
            const Response = await this.pacientesRepository.findOne({
                where: {
                    nome: nomePacienteId.nome,
                }
            })
            if(!Response){
                throw new HttpException('Nome paciente não encontrado',404)
            }
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async getPacienteById(pacienteId:PacienteIdPath):Promise<PacienteEntity>{
        try {
            const Response = await this.pacientesRepository.findOne(pacienteId.id)
            if(!Response){
                throw new HttpException('Paciente não encontrado',404)
            }
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
    async deletePacienteById(pacienteId:PacienteIdPath):Promise<DeleteResult>{
        try {
            const Response = await this.pacientesRepository.delete(pacienteId.id)
            return Response
        } catch (err){
            if (err instanceof HttpException) {
                throw err
            }                 
            throw new HttpException(err.message, 400)
        }
    }
}
