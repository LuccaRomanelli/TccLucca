import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from './feedback.service';
import { DataDTO,PulseiraDTO } from '../Models';
import { BehaviorSubject, Observable } from 'rxjs';

const {API_URL} = environment;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dadosList: BehaviorSubject<DataDTO[]> = new BehaviorSubject<DataDTO[]>([]);

  constructor(
    private readonly http:HttpClient,
    private readonly feedbackservice:FeedbackService,
  ) { }


  async getData(pulseiraFk: string, startDate: number, endDate: number){
    return this.http.get<DataDTO[]>(`${API_URL}/data/${pulseiraFk}?dataInicio=${startDate}&dataFim=${endDate}`).subscribe(data =>{
      this.setDadosList(data);
    }, err => {
      this.feedbackservice.showAlert(err.error.message, 'danger')
    })
  }

  private setDadosList (newDadosList:DataDTO[]) {
    this.dadosList.next(newDadosList);
  }

  getDadosList():Observable<DataDTO[]> {
    return this.dadosList.asObservable();
  }
}
