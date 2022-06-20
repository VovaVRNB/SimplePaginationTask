import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

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
  }

  exit() {
    this.router.navigate(['/page']);
  }

}
