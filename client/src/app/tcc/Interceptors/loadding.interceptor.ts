import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FeedbackService } from '../Services';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  request !: string;
  isLoading !: boolean;

  constructor(public feedbackService: FeedbackService) {
    this.feedbackService.getLastRequest().subscribe(lastRequest => this.request = lastRequest);
    this.feedbackService.getLoading().subscribe(isLoading => this.isLoading = isLoading);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isLoading) {
      this.feedbackService.setLoading(true)
    }
    this.feedbackService.setLastRequest(req.url)
    return next.handle(req).pipe(
      finalize(() => {
        if (req.url === this.request) {
          this.feedbackService.setLoading(false)
        }
      })
    );
  }
}
