import { Component, OnInit } from '@angular/core';
import { FriendsListService } from 'src/app/services/friends-list.service';
import { StorageService } from 'src/app/services/storage.service';

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

  constructor(private friendsListService: FriendsListService, private storageService: StorageService) { }
  friendsList: any = [];
  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.token = this.storageService.getToken();
      this.email = this.storageService.getUser().email;
      this.email=localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')!).user.email : '';
  
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
}