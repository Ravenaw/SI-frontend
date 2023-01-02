import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { StorageService } from 'src/app/services/storage.service';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  form: any = {
    keyword: null
  };
  constructor(private router: Router, private storageService: StorageService, private socket:Socket, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.socket.on('friendOnline', (data: any) => {
      this.storageService.setFriendOnline(data);
      console.log(data);
    console.log(this.storageService.getFriendsList());
      this.ref.detectChanges();
    });
    this.socket.on('friendOffline', (data: any) => {
      this.storageService.setFriendOffline(data);
      console.log(data);
      this.ref.detectChanges();
    });
  }

  Logout() {
    localStorage.removeItem('token');
    this.storageService.logout();
    this.router.navigate(['login']);
    this.socket.emit('logout', this.storageService.getUserSocket());
  }

  onSubmit(): void {
    const {keyword} = this.form;
    console.log("ver 1.0.2");
    this.router.navigate([''], { queryParams: { keyword: keyword } });
  }
    
}
