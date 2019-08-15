import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  path: String = "assets/icon_handshake.png";
  constructor(public nav: NavController) { }

  ngOnInit() {
  }
  navigate(){
    this.nav.navigateForward("auth");
  }
}
