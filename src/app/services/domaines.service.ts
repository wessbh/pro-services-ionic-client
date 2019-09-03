import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvService} from "./env.service";
import {AuthService} from "./auth/auth.service";
import {NativeStorage} from "@ionic-native/native-storage/ngx";

@Injectable({
  providedIn: 'root'
})
export class DomainesService {
  token: string = '';
  static_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJFLXNlcnZpY2UiLCJzdWIiOiI1ZDVkMDllYmQ2ZjQ4MTBkM2NlNDQzYjUiLCJpYXQiOjE1NjY1MzUxMDIwMTAsImV4cCI6MTU2NjYyMTUwMjAxMH0.kL0rkfzyF_GQTCZjoZ1JGPgypF4a7LuYKbR2AKSMDiQ';
  constructor(
      private http: HttpClient,
      private env: EnvService,
      private auth: AuthService,
      private storage: NativeStorage
  ) { }

  getDomaines() {
    this.storage.getItem('token').then((val) => {
      this.token = val.token;
      console.log(this.token);
    });
    let headers = new HttpHeaders().set('Authorization', this.static_token);
    return this.http.get(this.env.API_URL + 'domaines', {'headers': headers});
  }
}
