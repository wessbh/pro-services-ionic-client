import { Component, OnInit } from '@angular/core';
import {NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  path: String = "assets/icon_handshake.png";
  constructor(private nav: NavController) { }

  ngOnInit(){
  }
  navigate(route: string){
    this.nav.navigateForward(route);
  }
}
