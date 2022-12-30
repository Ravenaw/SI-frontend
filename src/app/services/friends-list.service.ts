import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const EMAIL_API = 'https://system-integration-goat.northeurope.cloudapp.azure.com:8001/sendInvite';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
   'Ocp-Apim-Subscription-Key': 'e64edeb333d44d75a71c4a269d757e13'})
};

@Injectable({
  providedIn: 'root',
})
export class FriendsListService {
    constructor(private http: HttpClient) {}
  
    send_invite(inviter_email: string, receiver_email: string): Observable<any> {
      return this.http.post(
        EMAIL_API ,
        {
          inviter_email,
          receiver_email,
        },
        httpOptions
      );
    }
}