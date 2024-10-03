import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  form: any = {
    data: {},
    message: ''
  }

  constructor(private httpService: HttpServiceService) {

  }

  signUp() {
    var self = this;
    this.httpService.post('http://localhost:8081/Auth/signUp', this.form.data, function (res: any) {
      self.form.message = res.result.message;
    })
  }

}
