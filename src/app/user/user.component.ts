import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
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
    this.httpClient.get('http://localhost:8081/User/preload').subscribe((res: any) => {
      this.form.preload = res.result.roleList;
    })
  }

  display() {
    this.httpClient.get('http://localhost:8081/User/get/' + this.form.data.id).subscribe((res: any) => {
      console.log(res)
      this.form.data = res.result.data;
    });
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
