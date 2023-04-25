import { Component, OnDestroy, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { Instrument } from 'src/app/models/instrument';
import { JwtApiService } from 'src/app/services/jwt-api.service';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  loginSub$!: Subscription
  isLoggedIn!: boolean
  borrowedItems!: Instrument[]

  constructor(
    private jwtHelper: JwtHelperService,

  ) { }

  ngOnInit() {
    const token = localStorage.getItem('jwt');
    // check for login status
    this.isLoggedIn = !!token && !this.jwtHelper.isTokenExpired(token);
    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('jwt')
    }
  }
}
