import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService} from '../Services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor( private authService: AuthService ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();
    if (token) {
      const dupReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      const NeedRefresh = this.authService.checkIfTokenNeedsToBeRefreshed();
      if(NeedRefresh){
        this.authService.refreshToken();
      }
      return next.handle(dupReq);
    }
    else {
      return next.handle(req);
    }
  }
}
