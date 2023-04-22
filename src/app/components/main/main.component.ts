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

  constructor(
    private jwtSvc: JwtApiService,
    private jwtHelper: JwtHelperService) { }

  ngOnDestroy(): void {
    this.loginSub$.unsubscribe()
  }

  ngOnInit() {
    const token = localStorage.getItem('jwt');
    this.isLoggedIn = !!token && !this.jwtHelper.isTokenExpired(token);
    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('jwt')
    }
  }
}
