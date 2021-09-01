import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterOptions, UserDTO } from '../../../Models';
import { UserService } from '../../../Services';
import { RolesEnum } from '../../../Enumns';
import { ValidatorSameValue } from '../../../Utils';

@Component({
  selector: 'app-current-user-form',
  templateUrl: './current-user-form.component.html',
  styleUrls: ['./current-user-form.component.scss']
})
export class CurrentUserFormComponent implements OnInit {

  rolesOptions: FilterOptions[] = [];
  disableButton: boolean = false;
  userId: number;
  showPassordFields: boolean = false

  currentUserForm = this.fb.group({
    email: [null,[Validators.required]],
    newPassword: [null],
    newPasswordConfirm: [null],
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

  setShowPassordFields(event){
    this.configPassowrdFields(event.checked)
  }

  validatorSameValue = (control: FormControl) => {
    if (this.currentUserForm && control.value) {
      if (!ValidatorSameValue(control.value, this.currentUserForm.controls.newPassword.value)) {
        return { confirm: true, error: true };
      }
    }
  };

  configPassowrdFields(show: boolean){
    this.showPassordFields = show;
    this.currentUserForm.controls.newPassword.reset();
    this.currentUserForm.controls.newPasswordConfirm.reset();

    if(show){
      this.currentUserForm.controls.newPassword.setValidators([Validators.required]);
      this.currentUserForm.controls.newPasswordConfirm.setValidators([Validators.required, this.validatorSameValue]);
    }
    else{
      this.currentUserForm.controls.newPassword.clearValidators();
      this.currentUserForm.controls.newPasswordConfirm.clearValidators();
    }

    this.currentUserForm.updateValueAndValidity();
  }

  async save(){
    if(this.currentUserForm.valid){
      const NewPassword = this.currentUserForm.controls.newPassword.value;
      const NewPasswordConfirm = this.currentUserForm.controls.newPasswordConfirm.value;
      if(!ValidatorSameValue(NewPasswordConfirm, NewPassword)){
        this.currentUserForm.controls.newPasswordConfirm.setErrors({ error: true })
        return
      }
      this.disableButtons(true);
      const UserFromForm = this.getFormAsUserDTO();
      const EditResponse = await this.userService.updateUser(this.userId, UserFromForm);
      if(EditResponse){
        if(!EditResponse['newCredentials']){
          this.userService.setCurrentUser(UserFromForm)
        }
        this.cancel();
      }
      this.disableButtons(false);
    }
  }

  getFormAsUserDTO():UserDTO{
    const NewUser:UserDTO = {
      id: this.userId,
      password: this.currentUserForm.controls.newPassword.value,
      email: this.currentUserForm.controls.email.value,
      role: this.currentUserForm.controls.role.value,
    }

    if(!NewUser.password){
      delete NewUser.password
    }
    return NewUser;
  }
}
