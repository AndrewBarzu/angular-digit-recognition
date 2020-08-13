import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }
  predict(image): Observable<any>{
    return this.http.get('https://python-digit-recognition.herokuapp.com/prediction', {
      params: new HttpParams().set('image', image.toString()),
    });
  }
}
