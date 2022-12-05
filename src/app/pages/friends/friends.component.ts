import { Component } from '@angular/core';
import { FriendsListService } from 'src/app/services/friends-list.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  constructor(private friendsListService: FriendsListService) { }
  friendsList: any = [];
  ngOnInit() {
    this.friendsList = this.friendsListService.friendsList;
  }
}