import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from '../env.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User, User_type } from '../../auth/models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token:any;
  route: string;
  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
  ) { }

  login(email: String, password: String) {
    return this.http.post(this.env.API_URL + 'users/signin',
      {email: email, password: password}
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }
  register(user: User) {
      if(user.user_type == 'client'){
          return this.http.post(this.env.API_URL + 'users/signup_client',
              {user_type: User_type.client, email: user.email, password: user.password,
                  nom: user.nom, prenom: user.prenom, num_portable: user.num_portable,
                  num_fixe: user.num_fixe, image: user.image}
          )
      }
      if(user.user_type == 'pro'){
          return this.http.post(this.env.API_URL + 'users/signup_pro',
              {user_type: User_type.pro, email: user.email, password: user.password,
                  nom: user.nom, prenom: user.prenom, num_portable: user.num_portable,
                  num_fixe: user.num_fixe, image: user.image, matricule_fiscale: user.matricule_fiscale}
          )
      }
  }
  async getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }
  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.http.get(this.env.API_URL + 'users/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }
}
