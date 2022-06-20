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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  employees:Emploees[] = [];
  emp:any;

  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  search(criteria:string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    this.employees = [];
    this.http.get('http://localhost:8080/employees/search/' + criteria, { headers: headers }).subscribe(data => {
      if (data) {
        this.emp = data;
        for(let e of this.emp) {
          this.employees.push(<Emploees>{id:e.empID ,name:e.empName ,active:e.empActive ,dep:e.dpName});
        }
        console.log(this.employees);
      }
    })
  }

  exit() {
    this.router.navigate(['/page']);
  }
}
