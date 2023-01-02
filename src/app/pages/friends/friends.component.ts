import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FriendsListService } from 'src/app/services/friends-list.service';
import { StorageService } from 'src/app/services/storage.service';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  form: any = {
    email: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  token: string = '';
  email: string = '';
  friendsList: any = [];

  constructor(private friendsListService: FriendsListService, private http: HttpClient, private storageService: StorageService, private socket: Socket, private changeDetector:ChangeDetectorRef) { }
  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.token = this.storageService.getToken();
      this.email = this.storageService.getUser().email;
      this.email=localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')!).user.email : '';

      const makeRequest = async () => {
        try {
          let response = await lastValueFrom<any>(this.http.post('https://system-integration-goat.northeurope.cloudapp.azure.com:8003/login', { email: this.email }, { headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': 'e64edeb333d44d75a71c4a269d757e13' } }));
          console.log(response);
          this.socket.emit('sendUserToServer', response.return);
          this.storageService.saveUserSocket(response.return);
          this.storageService.saveFriendsList(response.return.friends);
          //this.friendsList = this.storageService.getFriendsList();
          //this.changeDetector.detectChanges();

          
          
        } catch (error) {
          console.log(error);
        }
      };
      makeRequest();

      this.socket.on('friendsList', (data: any) => {
        console.log(data);
        this.storageService.saveFriendsList(data);
        //this.friendsList = this.storageService.getFriendsList();
        //this.changeDetector.detectChanges();
      });
      
    }
  }
  onSubmit(): void {
    let email = this.form.email;

    this.friendsListService.send_invite(this.email, email).subscribe({
      next: data => {
        console.log(data);
        this.friendsList = data;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
  ngDoCheck() {
    this.friendsList = this.storageService.getFriendsList();
    this.changeDetector.detectChanges();
  }
}