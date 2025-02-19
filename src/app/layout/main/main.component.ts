import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isUserLoggendIn: boolean = false;
  constructor() {

  }
  onActivate(event: any) {
    setTimeout(() => {
      if (localStorage.getItem('access_token')) {
        this.isUserLoggendIn = true

      }
      else {
        this.isUserLoggendIn = false
      }
    }, 200);
  }
}
