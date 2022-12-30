import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  Logout() {
    localStorage.removeItem('token');
    this.storageService.logout();
    this.router.navigate(['login']);
  }

  onSubmit(): void {
    const {keyword} = this.form;
    console.log("ver 1.0.2");
    this.router.navigate([''], { queryParams: { keyword: keyword } });
  }
    
}
