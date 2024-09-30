import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.preload();
  }

  onFileSelect(event: any) {
    this.fileToUpload = event.target.files.item(0);
    console.log(this.fileToUpload);
  }

  preload() {
    this.httpClient.get('http://localhost:8081/User/preload').subscribe((res: any) => {
      this.form.preload = res.result.roleList;
    })
  }

  save() {
    this.httpClient.post('http://localhost:8081/User/save', this.form.data).subscribe((res: any) => {
      console.log('res => ', res)

      this.form.message = '';

      if (res.result.message) {
        this.form.message = res.result.message;
      }

      this.form.data.id = res.result.data;

      this.myFile();
    });
  }

  myFile() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    return this.httpClient.post('http://localhost:8081/User/profilePic/' + this.form.data.id, formData).subscribe((res: any) => {
      console.log(this.fileToUpload);
    }, error => {
      console.log(error);
    });
  }
}
