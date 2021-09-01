import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, PlataformService } from '../../Services';
import { SideNavMenu, Plataform} from '../../Models';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit {
  
  Plataform = Plataform;
  currentPlataform: string;

  menuItens:SideNavMenu[] = [
    {
      label: "Paciente",
      route: "/home/paciente",
      icon:"people",
    },
    {
      label: "Pulseira",
      route: "/home/pulseira",
      icon:"watch",
    },
    {
      label: "Conexao",
      route: "/home/conexao",
      icon:"add_link",
    },
    {
      label: "Dados",
      route: "/home/dados",
      icon:"equalizer",
    },
    {
      label: "Usuários",
      route: "/home/user",
      icon:"badge",
    },
  ];
  activeRoute:string; 

  @ViewChild(MatSidenav,{static: false}) sidenav: MatSidenav;

  constructor(
    private readonly authService:AuthService,
    private readonly router:Router,
    private readonly plataformService:PlataformService
  ) { }

  ngOnInit() {
    this.activeRoute = this.router.url;
    this.router.events.subscribe((evt) => {
      if(evt instanceof NavigationEnd){
        this.activeRoute = evt.url;
      }
    });
    this.authService.refreshToken();
    this.plataformService.getPlataform().subscribe(currentPlataform=>{
      this.currentPlataform = currentPlataform;
      this.toggleSidenav(false)
    });
  }

  toggleSidenav(status?: boolean){
    if(this.sidenav){
      if(status !== undefined){
        if(status){
          this.sidenav.open();
        }
        else{
          this.sidenav.close();
        }
      }
      else{
        this.sidenav.toggle();
  
      }
    }
  }

  logout(){
    this.authService.logout(); 
  }

  checkIfIsActive(menuRoute: string){
    if(this.activeRoute.includes(menuRoute)){
      return true
    }
    return false
  }
  
  redirect(path:string){
    this.router.navigate([path]);
    if(this.currentPlataform === Plataform.Mobile){
      this.toggleSidenav(false);
    }
  }
}
