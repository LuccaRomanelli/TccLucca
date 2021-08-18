import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services'

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit {

  constructor(
    private readonly authService:AuthService,
  ) { }

  ngOnInit() {
    this.authService.refreshToken();
  }

}
