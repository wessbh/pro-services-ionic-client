import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../auth/models/user';
import { Card, card_type } from '../auth/models/card';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token:any;

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
  register(user: User, card: Card) {
    if(card.card_type == card_type.credit_card){
      return this.http.post(this.env.API_URL + 'users/signup_client',
        {user_type: 'client', email: user.email, password: user.password,
        nom: user.nom, prenom: user.prenom, num_portable: user.num_portable,
        num_fixe: user.num_fixe, image: user.image, card_type: card.card_type,
        card_number: card.card_number, expiration_date: card.expiration_date, cvv: card.cvv}
      )
    }
    if(card.card_type == card_type.edinar){
      return this.http.post(this.env.API_URL + 'users/signup_client',
        {user_type: 'client', email: user.email, password: user.password,
        nom: user.nom, prenom: user.prenom, num_portable: user.num_portable,
        num_fixe: user.num_fixe, image: user.image, card_type: card.card_type,
        card_number: card.card_number, password_edinar: card.password_edinar}
      )
    }
  }
}
