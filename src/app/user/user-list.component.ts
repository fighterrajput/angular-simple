import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  form: any = {
    searchParams: {},
    list: [],
    pageNo: 0
  }

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.httpClient.post('http://localhost:8081/User/search/' + this.form.pageNo, this.form.searchParams).subscribe((res: any) => {
      this.form.list = res.result.data;
      console.log('list => ', this.form.list)
    })
  }

}
