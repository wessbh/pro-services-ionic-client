import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DomainesService {

  constructor(
    private http: HttpClient,
    private env: EnvService) { }
  
  getDomaines() {
    return this.http.get(this.env.API_URL + 'domains').pipe(
        tap(data =>{
          console.log(data);
        })
      )
  }
}
