import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const EMAIL_API = 'http://68.219.117.56:8001/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
   'Ocp-Apim-Subscription-Key': 'e64edeb333d44d75a71c4a269d757e13'})
};

@Injectable({
  providedIn: 'root',
})
export class FriendsListService {
    constructor(private http: HttpClient) {}
  
    send_invite(email: string, password: string): Observable<any> {
      return this.http.post(
        EMAIL_API + 'login',
        {
          email,
          password,
        },
        httpOptions
      );
    }
}