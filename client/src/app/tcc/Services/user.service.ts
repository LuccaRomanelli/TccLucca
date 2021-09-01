import { Injectable } from '@angular/core';
import { UserDTO } from '../Models';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from './feedback.service';
import { CookieService } from 'ngx-cookie-service';

const {API_URL} = environment;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersList: BehaviorSubject<UserDTO[]> = new BehaviorSubject<UserDTO[]>([]);
  currentUser: BehaviorSubject<UserDTO> = new BehaviorSubject<UserDTO>(null);

  constructor(
    private readonly http:HttpClient,
    private readonly feedbackservice:FeedbackService,
    private readonly cookieService: CookieService
  ) { 
    const CurrentUser = this.getCurrentUserFromLocalStorage();
    if(CurrentUser){
      this.currentUser.next(CurrentUser);
    }
  }

  private getCurrentUserFromLocalStorage(){
    const CurrentUser = localStorage.getItem('CURRENT_USER')
    if(CurrentUser){
      return JSON.parse(CurrentUser);
    } 
    return null
  }

  private setCurrentUserOnLocalStorage(newUser:UserDTO){
    localStorage.setItem('CURRENT_USER',JSON.stringify(newUser));
  }

  getCurrentUser():Observable<UserDTO>{
    return this.currentUser.asObservable();
  }

  setCurrentUser(newUser:UserDTO){
    this.setCurrentUserOnLocalStorage(newUser);
    this.currentUser.next(newUser);
  }

  getAllUsers() {
    return this.http.get<UserDTO[]>(`${API_URL}/user`).subscribe(users=>{
      users = users.filter(user => user.id !== this.currentUser.value.id)
      this.setUsersList(users);
    },
    err=>{
      this.feedbackservice.showAlert(err.error.message,'danger');
    });
  }

  async getUsersById(id: number):Promise<UserDTO> {
    const GetUser = await this.http.get<UserDTO>(`${API_URL}/user/${id}`).toPromise().catch(err=>{
      this.feedbackservice.showAlert(err.error.message,'danger');
    });

    if(GetUser){
      return GetUser;
    }
  }

  async crateUser(newUser:UserDTO):Promise<UserDTO>{
    const CreateResponse = await this.http.post<UserDTO>(`${API_URL}/user`,newUser).toPromise().catch(err=>{
      this.feedbackservice.showAlert(err.error.message,'danger');
    });

    if(CreateResponse){
      return CreateResponse;
    }
  }

  deleteUser(id:string) {
    return this.http.delete(`${API_URL}/user/${id}`).subscribe(res=>{
      this.getAllUsers();
    },
    err=>{
      this.feedbackservice.showAlert(err.error.mensagem,'danger');
    });
  }

  async updateUser(id:number, user:UserDTO) {
    const EditResponse = await this.http.put(`${API_URL}/user/${id}`,user).toPromise().catch(err=>{
      this.feedbackservice.showAlert(err.error.message,'danger');
    });

    if(EditResponse['newCredentials']){
      this.setCurrentUser(EditResponse['newCredentials']['user'])
      this.setAuthToken(EditResponse['newCredentials']['accessToken'], EditResponse['newCredentials']['expiresIn'])
    }

    if(EditResponse){
      return EditResponse;
    }
  }

  private setUsersList (newUsersList:UserDTO[]) {
    this.usersList.next(newUsersList);
  }

  getUsersList():Observable<UserDTO[]> {
    return this.usersList.asObservable();
  }

  private setAuthToken(accessToken:string, expiresIn:number){
    const ExpirationTimeStamp = new Date().getTime()+expiresIn*1000;
    const ExpirationDate = new Date(ExpirationTimeStamp);
    this.cookieService.set('JWT_TOKEN',accessToken,ExpirationDate,'/');
    this.cookieService.set('JWT_EXPIRATION',ExpirationTimeStamp.toString(),ExpirationDate,'/');
  }
}
