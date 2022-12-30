import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://13.74.136.176:8000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
   'Access-Control-Allow-Origin': '*',
   'Ocp-Apim-Subscription-Key': 'e64edeb333d44d75a71c4a269d757e13'}),
  withCredentials: true
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Promise<any> {
    return fetch('http://13.74.136.176:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Ocp-Apim-Subscription-Key': 'e64edeb333d44d75a71c4a269d757e13'
        },
        body: JSON.stringify({
          email,
          password,
          })
    })
    .then(response => response.json())
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        name,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}