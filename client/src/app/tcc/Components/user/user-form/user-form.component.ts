import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterOptions, UserDTO } from '../../../Models';
import { UserService } from '../../../Services';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit,AfterViewInit {

  statusOptions: FilterOptions[] = [];
  disableButton: boolean = false;
  userId: number|null;
  title:string;

  userForm = this.fb.group({
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
  }

  async ngAfterViewInit(){
    this.userId = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : null;
    if(this.userId){
      const User = await this.userService.getUsersById(this.userId);
      if (User){
        this.userForm.controls.email.setValue(User.email);
        this.userForm.controls.role.setValue(User.role);
      } else {
        this.cancel();
      }
    }
    setTimeout(() => {
      this.title = this.userId ? 'Editar' : 'Criar';
    });
  }

  cancel(){
    this.router.navigate(['/home/user']);
  }

  disableButtons(status: boolean){
    this.disableButton = status;
  }

  async save(){
    if(this.userForm.valid){
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
      password: this.userForm.controls.senha.value,
      email: this.userForm.controls.email.value,
      role: this.userForm.controls.role.value,
    }
    return NewUser;
  }
}
