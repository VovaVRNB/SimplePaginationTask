import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';

export interface Emploees {
  id:number;
  name:any;
  active:any;
  dep:any;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  employees:Emploees[] = [];
  emp:any;
  page = 0;

  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    this.employees = [];
    this.http.get('http://localhost:8080/employees?page=' + this.page + '&size=5', { headers: headers }).subscribe(data => {
      if (data) {
        this.emp = data;
        for(let e of this.emp) {
          this.employees.push(<Emploees>{id:e.empID ,name:e.empName ,active:e.empActive ,dep:e.dpName});
        }
        console.log(this.employees);
      }
    })
  }

  next() {
    this.page++;
    this.getAll();
    console.log(this.page);
  }

  prev() {
    if (this.page != 0) {
      this.page--;
    }
    this.getAll();
    console.log(this.page);
  }

  view(id:any) {
    sessionStorage.setItem('Id', id);
    this.router.navigate(['/view']);
  }

  edit(id:any) {
    sessionStorage.setItem('Id', id);
    this.router.navigate(['/edit']);
  }

  delete(id:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    this.http.delete('http://localhost:8080/employees/' + id, { headers: headers }).subscribe(data => {
      if (data) {
        console.log(this.employees);
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
        });
      }
    })
  }

  search() {
    this.router.navigate(['/search']);
  }

  loguot() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

}
