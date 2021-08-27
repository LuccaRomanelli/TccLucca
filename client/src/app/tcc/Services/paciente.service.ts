import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from './feedback.service';
import { PacienteDTO } from '../Models';
import { BehaviorSubject, Observable } from 'rxjs';

const {API_URL} = environment

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private pacientesList: BehaviorSubject<PacienteDTO[]> = new BehaviorSubject<PacienteDTO[]>([]);

  constructor(
      private readonly http: HttpClient,
      private readonly feedbackService: FeedbackService
  ) { }

  getAllPacientes(){
      this.http.get<PacienteDTO[]>(`${API_URL}/paciente`).subscribe(pacientes => {
        this.setPacientesList(pacientes);
      }, err => {
          this.feedbackService.showAlert(err.error.message, 'danger')
      })
  }

  async getPacienteById(id: number):Promise<PacienteDTO> {
    const GetPaciente = await this.http.get<PacienteDTO>(`${API_URL}/paciente/${id}`).toPromise().catch(err=>{
      this.feedbackService.showAlert(err.error.message,'danger');
    });

    if(GetPaciente){
      return GetPaciente;
    }
  }

  async cratePaciente(newPaciente:PacienteDTO):Promise<PacienteDTO>{
    const CreateResponse = await this.http.post<PacienteDTO>(`${API_URL}/paciente`,newPaciente).toPromise().catch(err=>{
      this.feedbackService.showAlert(err.error.message,'danger');
    });

    if(CreateResponse){
      return CreateResponse;
    }
  }

  async updatePaciente(id:number, pulseira:PacienteDTO) {
    const EditResponse = await this.http.put(`${API_URL}/paciente/${id}`,pulseira).toPromise().catch(err=>{
      this.feedbackService.showAlert(err.error.message,'danger');
    });

    if(EditResponse){
      return EditResponse;
    }
  }

  private setPacientesList(newPacientesList: PacienteDTO[]){
    return this.pacientesList.next(newPacientesList);
  }

  getPacientesList(): Observable<PacienteDTO[]>{
    return this.pacientesList.asObservable();
  }

  deletePaciente(id:string) {
    return this.http.delete(`${API_URL}/pacientes/${id}`).subscribe(res=>{
      this.getAllPacientes();
    },
    err=>{
      this.feedbackService.showAlert(err.error.mensagem,'danger');
    });
  }
}
