import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from './feedback.service';
import { ConexaoDTO } from '../Models';
import { BehaviorSubject, Observable } from 'rxjs';

const {API_URL} = environment;

@Injectable({
  providedIn: 'root'
})
export class ConexaoService {

  private conexaosList: BehaviorSubject<ConexaoDTO[]> = new BehaviorSubject<ConexaoDTO[]>([]);
  
  constructor(
    private readonly http:HttpClient,
    private readonly feedbackservice:FeedbackService,
  ) { }


  async getConexionByPacienteId(pacienteId:number):Promise<ConexaoDTO>{
    const Conexion = await this.http.get<ConexaoDTO>(`${API_URL}/conexao/paciente/${pacienteId}`).toPromise().catch(err=>{
      this.feedbackservice.showAlert(err.error.message,'danger');
    });

    if(Conexion){
      return Conexion;
    }
  }

  getAllConexaos() {
    return this.http.get<ConexaoDTO[]>(`${API_URL}/conexao`).subscribe(conexaos=>{
      this.setConexaosList(conexaos);
    },
    err=>{
      this.feedbackservice.showAlert(err.error.message,'danger');
    });
  }

  async getConexaosById(id: number):Promise<ConexaoDTO> {
    const GetConexao = await this.http.get<ConexaoDTO>(`${API_URL}/conexao/${id}`).toPromise().catch(err=>{
      this.feedbackservice.showAlert(err.error.message,'danger');
    });

    if(GetConexao){
      return GetConexao;
    }
  }

  async crateConexao(newConexao:ConexaoDTO):Promise<ConexaoDTO>{
    const CreateResponse = await this.http.post<ConexaoDTO>(`${API_URL}/conexao`,newConexao).toPromise().catch(err=>{
      this.feedbackservice.showAlert(err.error.message,'danger');
    });

    if(CreateResponse){
      return CreateResponse;
    }
  }

  deleteConexao(id:string) {
    return this.http.delete(`${API_URL}/conexao/${id}`).subscribe(res=>{
      this.getAllConexaos();
    },
    err=>{
      this.feedbackservice.showAlert(err.error.mensagem,'danger');
    });
  }

  async updateConexao(id:string, conexao:ConexaoDTO) {
    const EditResponse = await this.http.put(`${API_URL}/conexao/${id}`,conexao).toPromise().catch(err=>{
      this.feedbackservice.showAlert(err.error.message,'danger');
    });
    if(EditResponse){
      this.getAllConexaos();
      return EditResponse;
    }
  }

  private setConexaosList (newConexaosList:ConexaoDTO[]) {
    this.conexaosList.next(newConexaosList);
  }

  getConexaosList():Observable<ConexaoDTO[]> {
    return this.conexaosList.asObservable();
  }

}
