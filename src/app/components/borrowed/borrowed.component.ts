import { Component, OnDestroy, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Instrument } from 'src/app/models/instrument';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-borrowed',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.css']
})
export class BorrowedComponent implements OnInit {
  isLoggedIn!: boolean
  instrumentList: Instrument[] = []

  constructor(
    private jwtHelper: JwtHelperService,
    private storeSvc: StoreDataService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwt');
    // check for login status
    this.isLoggedIn = !!token && !this.jwtHelper.isTokenExpired(token);
    if (this.jwtHelper.isTokenExpired(token)) {
      // no point keeping expired token i guess
      localStorage.removeItem('jwt')
    }
    if (!!token) {
      // get email from jwt
      const decodedToken = this.jwtHelper.decodeToken(token);
      const email = decodedToken.email;
      // load borrowed items
      this.storeSvc.getBorrowed(email)
        .then(response => {
          console.log(response)
          this.instrumentList = response
        })
    }
  }

}
