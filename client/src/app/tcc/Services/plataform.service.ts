import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plataform } from '../Models';



@Injectable({
  providedIn: 'root'
})

export class PlataformService {

  private currentPlataform: BehaviorSubject<string> = new BehaviorSubject<string>("")
  private breakpoints: string[] = [Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web]

  constructor(public breakpointObserver: BreakpointObserver) {

    this.breakpointObserver.observe(this.breakpoints).subscribe((state: BreakpointState) => {
      if (state.matches) {
        Object.keys(state.breakpoints).forEach(breakpoint => {
          if (state.breakpoints[breakpoint]) {
            this.breakpoints.forEach(targetBreakpoint => {
              const BreakpointsValues = targetBreakpoint.split(', ');
              BreakpointsValues.forEach((value: string) => {
                if (value === breakpoint) {
                  if (targetBreakpoint === Breakpoints.Handset) {
                    this.setPlataform(Plataform.Mobile);
                  }
                  else if (targetBreakpoint === Breakpoints.Tablet) {
                    this.setPlataform(Plataform.Tablet);
                  }
                  else if (targetBreakpoint === Breakpoints.Web) {
                    this.setPlataform(Plataform.Desktop);
                  }
                }
              });
            })
          }
        })
      }
    })

  }

  private setPlataform(newPlataform: string) {
    this.currentPlataform.next(newPlataform);
  }

  getPlataform() {
    return this.currentPlataform.asObservable();
  }

}
