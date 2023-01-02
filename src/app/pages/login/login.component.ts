import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };

  updateForm: any = {
    email: null,
    password: null,
    newPassword: null,
    file: null
  };
  fileName = '';
  isLoggedIn = false;
  userdata: any;
  time1 = new Date();
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private ref: ChangeDetectorRef, private socket: Socket) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.userdata = this.storageService.getUser();
      this.authService.getUser(this.userdata.user.email).then(data => {
        console.log(data);
        this.userdata.user = data;
        //this.ref.detectChanges();
      })
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    console.log("ver 1.0.2");
    this.authService.login(email, password).then(data => {
      this.storageService.saveUser(data);
      console.log("it gets here");
      this.time1 = new Date();
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigate([''])
    })
      .catch(err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      })

  }

  onSubmitUpdate(): void {
    const { email, password } = this.form;
    console.log("ver 1.0.2");
    this.authService.login(email, password).then(data => {
      this.storageService.saveUser(data);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigate([''])
    })
      .catch(err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      })

  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("name", this.userdata.user.name);
      formData.append("email", this.userdata.user.email);
      formData.append("phone", "123456789");
      formData.append("file", file);


      const upload$ = this.authService.updatePicture(formData);

      upload$.subscribe();
    }
  }

}