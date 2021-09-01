import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterOptions, UserDTO } from '../../../Models';
import { UserService } from '../../../Services';

@Component({
  selector: 'app-current-user-form',
  templateUrl: './current-user-form.component.html',
  styleUrls: ['./current-user-form.component.scss']
})
export class CurrentUserFormComponent implements OnInit {

  statusOptions: FilterOptions[] = [];
  disableButton: boolean = false;
  userId: number|null;
  title:string;

  currentUserForm = this.fb.group({
    email: [null,[Validators.required]],
    senha: [null],
    role: [null,[Validators.required]]
  })

  constructor(
    private readonly fb:FormBuilder,
    private readonly router:Router,
    private readonly userService:UserService,
    private readonly route:ActivatedRoute
  ) { }

  ngOnInit() {
    const CurrentUser = this.userService.getCurrentUser().subscribe(currentUser => {
      if(currentUser){
        this.currentUserForm.controls.email.setValue(currentUser.email);
        this.currentUserForm.controls.role.setValue(currentUser.role);
      }
    });
  }

  cancel(){
    this.router.navigate(['/home/dados']);
  }

  disableButtons(status: boolean){
    this.disableButton = status;
  }

  async save(){
    if(this.currentUserForm.valid){
      this.disableButtons(true);
      const UserFromForm = this.getFormAsUserDTO();
      if(this.userId){
        const EditResponse = await this.userService.updateUser( this.userId, UserFromForm);
        if(EditResponse){
          this.cancel();
        }
      }
      else{
        const CreateResponse = await this.userService.crateUser(UserFromForm);
        if(CreateResponse){
          this.cancel();
        }
      }
      this.disableButtons(false);
    }
  }

  getFormAsUserDTO():UserDTO{
    const NewUser:UserDTO = {
      id: this.userId,
      password: this.currentUserForm.controls.senha.value,
      email: this.currentUserForm.controls.email.value,
      role: this.currentUserForm.controls.role.value,
    }
    return NewUser;
  }
}
