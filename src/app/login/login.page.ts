import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  path: String = "assets/icon_handshake.png";
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private nav: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }
  navigate(){
    this.nav.navigateForward("auth");
  }
  
  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }
  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.alertService.presentToast("Logged In");
      },
      error => {
        console.log(error);
      },
      () => {
        this.nav.navigateRoot('/auth');
      }
    );
  }
}
