import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { FeedbackService } from './feedback.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { LoginResponseDTO, CredentialsDTO } from '../Models'
import { BehaviorSubject } from 'rxjs';

const {API_URL} = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  willRefresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly http:HttpClient,
    private readonly router:Router,
    private readonly feedbackService:FeedbackService,
    private readonly userService:UserService,
    private readonly cookieService:CookieService,
  ) { }

  login(credentials:CredentialsDTO){
    return this.http.post<LoginResponseDTO>(`${API_URL}/auth/login`,credentials).subscribe(loginResponse=>{
      if(loginResponse){
        this.setAuthToken(loginResponse.accessToken,loginResponse.expiresIn);
        this.userService.setCurrentUser(loginResponse.user);
        this.feedbackService.showAlert(`Bem Vindo ao sistema ${loginResponse.user.email}`,'success')
        this.router.navigate(['home']);
      }
    },
    err=>{
      this.feedbackService.showAlert(err.error.message,'danger');
    })
  }

  logout(){
    this.cookieService.set('JWT_TOKEN','',-1,'/');
    this.cookieService.set('JWT_EXPIRATION','',-1,'/');
    localStorage.removeItem('CURRENT_USER');
    this.router.navigate(['login']); 

  }

  refreshToken(){
    return this.http.post<LoginResponseDTO>(`${API_URL}/auth/refresh`,null).subscribe(refreshResponse=>{
      if(refreshResponse){
        this.setAuthToken(refreshResponse.accessToken,refreshResponse.expiresIn);
        this.userService.setCurrentUser(refreshResponse.user);
      }
    },
    err=>{
      this.logout();
      this.feedbackService.showAlert(err.error.message,'danger');
    })
  }

  private setAuthToken(accessToken:string, expiresIn:number){
    const ExpirationTimeStamp = new Date().getTime()+expiresIn*1000;
    const ExpirationDate = new Date(ExpirationTimeStamp);
    this.cookieService.set('JWT_TOKEN',accessToken,ExpirationDate,'/');
    this.cookieService.set('JWT_EXPIRATION',ExpirationTimeStamp.toString(),ExpirationDate,'/');
  }

  getAuthToken(){
    return this.cookieService.get('JWT_TOKEN');
  }

  checkIfTokenNeedsToBeRefreshed(){
    const ExpirationDate = this.cookieService.get('JWT_EXPIRATION');
    const RemaningTime = Number(ExpirationDate) - new Date().getTime();
    const fifteenMinInMs = 900000;
    if(RemaningTime <= fifteenMinInMs && RemaningTime > 0){
      if(!this.willRefresh.value){
        this.willRefresh.next(true);
        return true
      }
      else{
        return false
      }
    }
    else{
      return false
    }
  }

}
