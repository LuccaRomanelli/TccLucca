import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from './feedback.service';
import { ConexaoDTO } from '../Models';

const {API_URL} = environment;

@Injectable({
  providedIn: 'root'
})
export class ConexaoService {

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

}
