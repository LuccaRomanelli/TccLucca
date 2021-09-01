import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { UserService, FeedbackService, AuthService } from '../Services';
import { UserDTO } from '../Models'
import { RolesEnum } from '../Enumns';

@Injectable()
export class RoleRouteGuard implements CanActivateChild {

  currentUser: UserDTO;

  constructor(
    private router: Router,
    private feedbackService: FeedbackService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const NecessaryPermission = route.data['role'];
    if(!NecessaryPermission){
      this.feedbackService.showAlert('Acesso não autorizado', 'danger');
      this.router.navigate(['home']);
      return false;
    }

    if(this.currentUser){

      if(NecessaryPermission === RolesEnum.ADMIN && this.currentUser.role !== RolesEnum.ADMIN){
        this.feedbackService.showAlert('Acesso não autorizado', 'danger');
        this.router.navigate(['home']);
        return false
      }
      else{
        return true
      }
    }
    else{
      this.authService.logout();
    }

    this.feedbackService.showAlert('Acesso não autorizado', 'danger');
    this.router.navigate(['home']);
    return false;
  }
}
