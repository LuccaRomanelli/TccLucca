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


  async cratePulseira(newPulseira:DataDTO):Promise<DataDTO>{
    const CreateResponse = await this.http.post<DataDTO>(`${API_URL}/pulseira`,newPulseira).toPromise().catch(err=>{
      this.feedbackservice.showAlert(err.error.message,'danger');
    });

    if(CreateResponse){
      return CreateResponse;
    }
  }


  async updatePulseira(id:number, pulseira:DataDTO) {
    const EditResponse = await this.http.put(`${API_URL}/pulseira/${id}`,pulseira).toPromise().catch(err=>{
      this.feedbackservice.showAlert(err.error.message,'danger');
    });

    if(EditResponse){
      return EditResponse;
    }
  }

  private setDadosList (newDadosList:DataDTO[]) {
    this.dadosList.next(newDadosList);
  }

  getDadosList():Observable<DataDTO[]> {
    return this.dadosList.asObservable();
  }
}
