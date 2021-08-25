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

  private setPacientesList(newPacientesList: PacienteDTO[]){
    return this.pacientesList.next(newPacientesList);
  }

  getPacientesList(): Observable<PacienteDTO[]>{
    return this.pacientesList.asObservable();
  }

}
