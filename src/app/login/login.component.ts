import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

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

  constructor(private router: Router, private httpService: HttpServiceService) {

  }

  signIn() {
    
    var self = this;

    this.httpService.post('http://localhost:8081/Auth/login', this.form.data, function (res: any) {

      if (res.result.message) {
        self.form.message = res.result.message;
      }

      if (res.success && res.result.data != null) {
        localStorage.setItem('firstName', res.result.data.firstName)
        localStorage.setItem('roleName', res.result.data.roleName)
        self.router.navigateByUrl('welcome');
      }

    })
  }

  signUp() {
    this.router.navigateByUrl('signup')
  }
}
