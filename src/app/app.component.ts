import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { AlertService } from './services/alert.service';
import { DomainesService } from './services/domaines.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  showSplash = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private domaineService: DomainesService,
    private nav: NavController,
    private alertService: AlertService

  ) {
    this.initializeApp();
    this.domaineService.getDomaines();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(()=> this.showSplash = false);

      this.authService.getToken();
    });
  }
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Home',
      url: '/login',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/landing-page',
      icon: 'list'
    },
  ];
  logout() {
    this.authService.logout().subscribe(
      data => {
        this.alertService.presentToast(data['You logged out !']);        
      },
      error => {
        console.log(error);
      },
      () => {
        this.nav.navigateRoot('/home');
      }
    );
  }
}