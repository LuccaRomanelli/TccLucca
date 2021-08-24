import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../Services';
import { CredentialsDTO } from '../../Models'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: [null,[Validators.email,Validators.required]],
    password: [null,[Validators.required]]
  })

  constructor(
    private readonly fb:FormBuilder,
    private readonly authService:AuthService 
  ) { }

  ngOnInit() {
  }

  login(){
    if(this.loginForm.valid){
      const NewCredentials = this.getFormAsCredentials();
      this.authService.login(NewCredentials); 
    }
  }

  private getFormAsCredentials():CredentialsDTO {
    const NewCredentials:CredentialsDTO = {
      ...this.loginForm.value
    }
    return NewCredentials;
  }

}
