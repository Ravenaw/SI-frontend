import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  Logout() {
    localStorage.removeItem('token');
    this.storageService.logout();
    this.router.navigate(['login']);
  }
}
