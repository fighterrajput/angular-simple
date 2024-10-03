import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  form: any = {
    searchParams: {},
    list: [],
    pageNo: 0,
    preload: [],
    deleteParams: {}
  }

  constructor(private httpService: HttpServiceService, private router: Router) {

  }

  ngOnInit(): void {
    this.preload();
    this.search();
  }

  preload() {
    var self = this;
    this.httpService.get('http://localhost:8081/User/preload', function (res: any) {
      self.form.preload = res.result.roleList;
    })
  }

  search() {
    var self = this;
    this.httpService.post('http://localhost:8081/User/search/' + this.form.pageNo, this.form.searchParams, function (res: any) {
      self.form.list = res.result.data;
      console.log('list => ', self.form.list)
      console.log('list length => ', self.form.list.length)
    })
  }

  previous() {
    this.form.pageNo--;
    this.search();
  }

  next() {
    this.form.pageNo++;
    this.search();
  }

  onCheckboxChange(userId: number) {
    console.log('Checkbox with ID', userId, 'is checked/unchecked');
    this.form.deleteParams.id = userId;
  }

  delete() {
    var self = this;
    this.httpService.get('http://localhost:8081/User/delete/' + this.form.deleteParams.id, function (res: any) {
      self.form.message = res.result.message;
      console.log('message => ', self.form.message)
      self.form.pageNo = 0;
      self.search();
    });
  }

  edit(page: any) {
    this.router.navigateByUrl(page);
  }

}
