import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loadingElement: any;
  email: string = '';
  password: string = '';
  path: String = "assets/icon_handshake.png";
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private nav: NavController,
    private alertService: AlertService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }
  navigate(route: string){
    this.nav.navigateForward(route);
  }
  
  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }
  async presentLoading() {
  
    this.loadingElement = await this.loadingController.create({
      message: 'Logging...',
      spinner: 'crescent'
    });
    return await this.loadingElement.present();
  }
  async login(form: NgForm) {
    await this.presentLoading();
    await this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.alertService.presentToast("Logged In");
        this.loadingElement.dismiss();
      },
      error => {
        this.loadingElement.dismiss();
        this.alertService.presentToast("Wrong credentials !");
      },
      () => {
        this.nav.navigateRoot('/landing-page');
      }
    );
  }
  
}
