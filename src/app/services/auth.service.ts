import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://system-integration-goat.northeurope.cloudapp.azure.com:8000/';
const USER_API = 'https://system-integration-goat.northeurope.cloudapp.azure.com:8004/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
   'Access-Control-Allow-Origin': '*',
   'Ocp-Apim-Subscription-Key': 'e64edeb333d44d75a71c4a269d757e13'}),
  withCredentials: true
};

const httpOptions2 = {
  headers: new HttpHeaders({
   'Access-Control-Allow-Origin': '*'}),
  withCredentials: true
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Promise<any> {
    return fetch(AUTH_API + 'login', {
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

  updatePicture(blob: FormData): Observable<any> {
    //const upload$ = this.http.post("/api/thumbnail-upload", formData);
    return this.http.post(USER_API + 'updateInfo',blob, httpOptions2);
  }

  getUser(email: string): Promise<any> {
    return fetch(USER_API + 'getInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Ocp-Apim-Subscription-Key': 'e64edeb333d44d75a71c4a269d757e13'
        },
        body: JSON.stringify({
          email
          })
    })
    .then(response => response.json())
  }

}