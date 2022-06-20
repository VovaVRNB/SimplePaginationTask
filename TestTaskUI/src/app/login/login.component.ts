import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable, interval, of } from 'rxjs';
import { tap, map, mapTo, catchError, first } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  public generateToken(name:string, password:string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let options = { headers: headers };
    let body = {
      "username":name,
      "password":password
    };
    this.http.post<any>('http://localhost:8080/login', body, {observe: "body"}).subscribe(data => {
      let token = data;
      sessionStorage.setItem('token', token);
      if (this.isLoggedIn()) {
        this.router.navigate(['/page']);
      }
    });
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('token');
  }

}
