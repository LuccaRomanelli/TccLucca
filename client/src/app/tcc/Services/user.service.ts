import { Injectable } from '@angular/core';
import { UserDTO } from '../Models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: BehaviorSubject<UserDTO> = new BehaviorSubject<UserDTO>(null);

  constructor() { 
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
}
