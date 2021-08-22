import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TccRoutingModule } from './tcc.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { LoadingInterceptor, AuthInterceptor} from '../Interceptors';
import { CookieService } from 'ngx-cookie-service';
import { MaterialModule } from '../../material';
import { PacienteComponent, PulseiraComponent, ConexaoComponent, DadosComponent } from '../Components';
import { 
  AppContainerComponent,
  LoginComponent,
  AlertComponent,
  ProgressSpinnerDialogComponent
} from '../Components';
import{
  AuthService,
  PlataformService,
  FeedbackService,
  UserService
} from '../Services'
import {
  LoginRouteGuard,
  UserLoggedRouteGuard
} from '../Guards'



@NgModule({
  declarations: [
    AppContainerComponent,
    LoginComponent,
    AlertComponent,
    ProgressSpinnerDialogComponent,
    PacienteComponent,
    PulseiraComponent,
    ConexaoComponent,
    DadosComponent
  ],
  imports: [
    CommonModule,
    TccRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule
  ],
  providers:[
    AuthService,
    PlataformService,
    FeedbackService,
    UserService,
    CookieService,
    LoginRouteGuard,
    UserLoggedRouteGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: MAT_SNACK_BAR_DATA,
      useValue: {}
    }
  ],
  entryComponents:[
    AlertComponent,
    ProgressSpinnerDialogComponent
  ]
})
export class TccModule { }
