import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AppContainerComponent,
  LoginComponent,
  PacienteComponent,
  PulseiraComponent,
  ConexaoComponent,
  DadosComponent
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
        component: PacienteComponent
      },
      {
        path: 'pulseira',
        component: PulseiraComponent
      },
      {
        path: 'conexao',
        component: ConexaoComponent
      },
      {
        path: 'dados',
        component: DadosComponent
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
