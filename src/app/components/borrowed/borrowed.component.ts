import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private storeSvc: StoreDataService,
    private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwt')
    // check for login status
    if (this.jwtHelper.isTokenExpired(token)) {
      // no point keeping expired token i guess
      localStorage.removeItem('jwt')
    }
    this.isLoggedIn = !!token
    if (!this.isLoggedIn) {
      this.router.navigate(['/login'])
    }
    if (!!token) {
      // load borrowed items
      this.storeSvc.getBorrowed()
        .then(response => {
          console.log(response)
          this.instrumentList = response
        })
    }
  }

  returnInstrument(id: number) {
    console.debug(id)
  }
}
