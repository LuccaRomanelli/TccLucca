import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from './feedback.service';
import { PulseiraDTO } from '../Models';
import { BehaviorSubject, Observable } from 'rxjs';

const {API_URL} = environment;

@Injectable({
  providedIn: 'root'
})
export class PulseiraService {

  private pulseirasList: BehaviorSubject<PulseiraDTO[]> = new BehaviorSubject<PulseiraDTO[]>([]);

  constructor(
    private readonly http:HttpClient,
    private readonly feedbackservice:FeedbackService,
  ) { }

  getAllPulseiras() {
    return this.http.get<PulseiraDTO[]>(`${API_URL}/pulseira`).subscribe(pulseiras=>{
      this.setPulseirasList(pulseiras);
    },
    err=>{
      this.feedbackservice.showAlert(err.error.mensagem,'danger');
    });
  }

  getPulseirasById() {}

  cratePulseira() {}

  deletePulseira(id:string) {
    return this.http.delete(`${API_URL}/pulseira/${id}`).subscribe(res=>{
      this.getAllPulseiras();
    },
    err=>{
      this.feedbackservice.showAlert(err.error.mensagem,'danger');
    });
  }

  updateePulseira() {}

  private setPulseirasList (newPulseirasList:PulseiraDTO[]) {
    this.pulseirasList.next(newPulseirasList);
  }

  getPulseirasList():Observable<PulseiraDTO[]> {
    return this.pulseirasList.asObservable();
  }
}
