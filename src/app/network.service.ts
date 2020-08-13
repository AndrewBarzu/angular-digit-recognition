import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }
  predict(image): Observable<any>{
    return this.http.get('http://127.0.0.1:5000/prediction', {
      params: new HttpParams().set('image', image),
    });
  }
}
