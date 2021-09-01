import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AppContainerComponent,
  LoginComponent,
  PacienteListComponent,
  PacienteFormComponent,
  PulseiraListComponent,
  PulseiraFormComponent,
  ConexaoListComponent,
  ConexaoFormComponent,
  DadosComponent,
  UserListComponent,
  CurrentUserFormComponent,
  UserFormComponent
} from '../Components'
import { 
  LoginRouteGuard,
  UserLoggedRouteGuard,
  RoleRouteGuard
} from '../Guards'
import { RolesEnum } from '../Enumns';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [LoginRouteGuard],
    component: AppContainerComponent,
    canActivateChild: [RoleRouteGuard],
    children:[
      {
        path: 'paciente',
        data: {'role': RolesEnum.STANDARD},
        component: PacienteListComponent
      },
      {
        path: 'paciente/nova',
        data: {'role': RolesEnum.STANDARD},
        component: PacienteFormComponent
      },
      {
        path: 'paciente/editar/:id',
        data: {'role': RolesEnum.STANDARD},
        component: PacienteFormComponent
      },
      {
        path: 'pulseira',
        data: {'role': RolesEnum.STANDARD},
        component: PulseiraListComponent,
      },
      {
        path: 'pulseira/nova',
        data: {'role': RolesEnum.STANDARD},
        component: PulseiraFormComponent,
      },
      {
        path: 'pulseira/editar/:id',
        data: {'role': RolesEnum.STANDARD},
        component: PulseiraFormComponent,
      },
      {
        path: 'conexao',
        data: {'role': RolesEnum.STANDARD},
        component: ConexaoListComponent
      },
      {
        path: 'conexao/nova',
        data: {'role': RolesEnum.STANDARD},
        component: ConexaoFormComponent
      },
      {
        path: 'dados',
        data: {'role': RolesEnum.STANDARD},
        component: DadosComponent
      },
      {
        path: 'user',
        data: {'role': RolesEnum.ADMIN},
        component: UserListComponent
      },
      {
        path: 'user/current',
        data: {'role': RolesEnum.STANDARD},
        component: CurrentUserFormComponent
      },
      {
        path: 'user/editar/:id',
        data: {'role': RolesEnum.ADMIN},
        component: UserFormComponent
      },
      {
        path: 'user/nova',
        data: {'role': RolesEnum.ADMIN},
        component: UserFormComponent
      },
      {
        path: '**',
        redirectTo: 'dados'
      },
      {
        path: '',
        redirectTo: 'dados',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'login',
    canActivate: [UserLoggedRouteGuard],
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TccRoutingModule { }
