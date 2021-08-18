import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertComponent } from '../Components/alert/alert.component';
import { ProgressSpinnerDialogComponent } from '../Components/progress-spinner-dialog/progress-spinner-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  loading = new BehaviorSubject<boolean>(false);
  lastRequest = new BehaviorSubject<string>('');

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  showAlert(data: string, type: string, duration: number = 6000) {
    this.snackBar.openFromComponent(AlertComponent, {
      data: data,
      panelClass: [type],
      duration: duration
    });
  }

  showLoadingScreen(show: boolean) {
    if (show) {
      this.dialog.open(ProgressSpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true
      });
    }
    else {
      this.dialog.closeAll()
    }
  }

  setLoading(isLoading: boolean) {
    this.loading.next(isLoading);
    this.showLoadingScreen(isLoading);
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  setLastRequest(lastRequest: string) {
    this.lastRequest.next(lastRequest);
  }

  getLastRequest(): Observable<string> {
    return this.lastRequest.asObservable();
  }

}
