import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private loginSer: LoginService){}

  ngOnInit() {
    this.loginSer.onAutoLOgin();
  }
}
