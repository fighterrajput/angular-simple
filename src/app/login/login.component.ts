import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: any = {
    data: {},
    message: ''
  }

  constructor(private router: Router, private httpClient: HttpClient) {

  }

  signIn() {
    this.httpClient.post('http://localhost:8081/Auth/login', this.form.data).subscribe((res: any) => {

      if (res.result.message) {
        this.form.message = res.result.message;
      }

      if (res.success && res.result.data != null) {
        localStorage.setItem('firstName', res.result.data.firstName)
        localStorage.setItem('roleName', res.result.data.roleName)
        this.router.navigateByUrl('welcome');
      }
    })
  }

  signUp() {
    this.router.navigateByUrl('signup')
  }

}
