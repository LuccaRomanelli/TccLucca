import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterOptions, UserDTO } from '../../../Models';
import { UserService } from '../../../Services';
import { RolesEnum } from '../../../Enumns';

@Component({
  selector: 'app-current-user-form',
  templateUrl: './current-user-form.component.html',
  styleUrls: ['./current-user-form.component.scss']
})
export class CurrentUserFormComponent implements OnInit {

  rolesOptions: FilterOptions[] = [];
  disableButton: boolean = false;
  userId: number;

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
    Object.keys(RolesEnum).forEach(key => {
      this.rolesOptions.push({
        key: RolesEnum[key],
        label: RolesEnum[key]
      })
    })

    this.userService.getCurrentUser().subscribe(currentUser => {
      if(currentUser){
        this.userId = currentUser.id;
        this.currentUserForm.controls.email.setValue(currentUser.email);
        this.currentUserForm.controls.role.setValue(currentUser.role);
        if(currentUser.role !== RolesEnum.ADMIN){
          this.currentUserForm.controls.role.disable();
        }
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
      // logic here
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
