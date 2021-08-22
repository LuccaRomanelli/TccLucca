import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services';
import { SideNavMenu } from '../../Models';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit {

  menuItens:SideNavMenu[] = [
    {
      label: "Paciente",
      route: "/home/paciente",
      icon:"person_add",
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
  ];
  activeRoute:string; 
  constructor(
    private readonly authService:AuthService,
    private readonly router:Router
  ) { }

  ngOnInit() {
    this.activeRoute = this.router.url;
    this.router.events.subscribe((evt) => {
      if(evt instanceof NavigationEnd){
        this.activeRoute = evt.url;
      }
    });
    this.authService.refreshToken();
  }

  logout(){
    this.authService.logout(); 
  }
  
  redirect(path:string){
    this.router.navigate([path]);
  }
}
