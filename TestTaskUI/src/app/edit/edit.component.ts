import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  dep:any;
  emp:any;

  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    this.http.get('http://localhost:8080/employees/' + sessionStorage.getItem("Id"), { headers: headers }).subscribe(data => {
      if (data) {
        console.log(data);
        this.emp = data;
      }
    })
    this.http.get('http://localhost:8080/departments', { headers: headers }).subscribe(data => {
      if (data) {
        this.dep = data;
        console.log(data);
      }
    })
  }

  edit(name:any, active:any, id:any) {
    console.log(name, active, id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    let options = { headers: headers };
    let body = {
      "empName":name,
      "empActive":active,
      "emp_dpID":id,
    };
    this.http.put('http://localhost:8080/employees/' + sessionStorage.getItem("Id"), body, options).subscribe(data => {
      if (data) {
        this.dep = data;
        console.log(data);
      }
    })
    this.router.navigate(['/page']);
  }

  exit() {
    this.router.navigate(['/page']);
  }

}
