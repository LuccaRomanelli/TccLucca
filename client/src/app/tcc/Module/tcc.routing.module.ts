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
  UserLoggedRouteGuard
} from '../Guards'

const routes: Routes = [
  {
    path: 'home',
    canActivate: [LoginRouteGuard],
    component: AppContainerComponent,
    children:[
      {
        path: 'paciente',
        component: PacienteListComponent
      },
      {
        path: 'paciente/nova',
        component: PacienteFormComponent
      },
      {
        path: 'paciente/editar/:id',
        component: PacienteFormComponent
      },
      {
        path: 'pulseira',
        component: PulseiraListComponent,
      },
      {
        path: 'pulseira/nova',
        component: PulseiraFormComponent,
      },
      {
        path: 'pulseira/editar/:id',
        component: PulseiraFormComponent,
      },
      {
        path: 'conexao',
        component: ConexaoListComponent
      },
      {
        path: 'conexao/nova',
        component: ConexaoFormComponent
      },
      {
        path: 'dados',
        component: DadosComponent
      },
      {
        path: 'user',
        component: UserListComponent
      },
      {
        path: 'user/current',
        component: CurrentUserFormComponent
      },
      {
        path: 'user/editar/:id',
        component: UserFormComponent
      },
      {
        path: 'user/nova',
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
