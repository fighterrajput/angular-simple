import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message = ''
  loginId = ''
  password = ''

  constructor(private router: Router) {

  }

  signIn() {
    if (this.loginId == 'admin' && this.password == 'admin') {
      this.router.navigateByUrl('welcome')
    } else {
      this.message = 'login & passowrd is invalid'
    }
  }

  signUp() {
    this.router.navigateByUrl('signup')
  }

}
