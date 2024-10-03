import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  form: any = {
    data: {},
    message: '',
    preload: []
  }

  fileToUpload: any = null;

  constructor(private httpService: HttpServiceService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: any) => {
      this.form.data.id = params["id"];
      console.log(this.form.data.id)
    })
  }

  ngOnInit(): void {
    this.preload();
    if (this.form.data.id && this.form.data.id > 0) {
      this.display();
    }
  }

  onFileSelect(event: any) {
    this.fileToUpload = event.target.files.item(0);
    console.log(this.fileToUpload);
  }

  preload() {
    var self = this;
    this.httpService.get('http://localhost:8081/User/preload', function (res: any) {
      self.form.preload = res.result.roleList;
    })
  }

  display() {
    var self = this;
    this.httpService.get('http://localhost:8081/User/get/' + this.form.data.id, function (res: any) {
      console.log(res)
      self.form.data = res.result.data;
    });
  }

  save() {
    var self = this;
    this.httpService.post('http://localhost:8081/User/save', this.form.data, function (res: any) {
      console.log('res => ', res)

      self.form.message = '';

      if (res.result.message) {
        self.form.message = res.result.message;
      }

      self.form.data.id = res.result.data;

      self.myFile();
    });
  }

  myFile() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    this.httpService.post('http://localhost:8081/User/profilePic/' + this.form.data.id, formData, function (res: any) {
    });
  }
}
