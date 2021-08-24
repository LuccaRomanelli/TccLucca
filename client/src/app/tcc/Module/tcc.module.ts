import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TccRoutingModule } from './tcc.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { LoadingInterceptor, AuthInterceptor} from '../Interceptors';
import { CookieService } from 'ngx-cookie-service';
import { SimplebarAngularModule } from 'simplebar-angular';
import { MaterialModule } from '../../material';
import {
  PacienteComponent,
  PulseiraListComponent,
  PulseiraFormComponent,
  ConexaoComponent,
  DadosComponent,
  UserComponent,
  DeleteModalComponent
} from '../Components';
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
  UserService,
  PulseiraService,
  DataService,
  PacienteService,
  ConexaoService
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
    PulseiraListComponent,
    PulseiraFormComponent,
    ConexaoComponent,
    DadosComponent,
    UserComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    TccRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    FlexModule,
    SimplebarAngularModule,
    NgxMaskModule.forRoot()
  ],
  providers:[
    AuthService,
    PlataformService,
    FeedbackService,
    UserService,
    CookieService,
    DataService,
    PacienteService,
    ConexaoService,
    PulseiraService,
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
    ProgressSpinnerDialogComponent,
    DeleteModalComponent
  ]
})
export class TccModule { }
