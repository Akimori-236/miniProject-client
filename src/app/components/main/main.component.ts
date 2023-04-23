import { Component, OnDestroy, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { JwtApiService } from 'src/app/services/jwt-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  loginSub$!: Subscription
  isLoggedIn!: boolean

  countries = [
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      area: 17075200,
      population: 146989754,
    },
    {
      name: 'Canada',
      flag: 'c/cf/Flag_of_Canada.svg',
      area: 9976140,
      population: 36624199,
    },
    {
      name: 'United States',
      flag: 'a/a4/Flag_of_the_United_States.svg',
      area: 9629091,
      population: 324459463,
    },
    {
      name: 'China',
      flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
      area: 9596960,
      population: 1409517397,
    },
  ]

  constructor(
    private jwtSvc: JwtApiService,
    private jwtHelper: JwtHelperService,
  ) { }

  ngOnDestroy(): void { }

  ngOnInit() {
    const token = localStorage.getItem('jwt');
    this.isLoggedIn = !!token && !this.jwtHelper.isTokenExpired(token);
    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('jwt')
    }
  }
}
