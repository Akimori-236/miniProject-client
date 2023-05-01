import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instrument } from 'src/app/models/instrument';
import { AuthService } from 'src/app/services/auth.service';
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
    private storeSvc: StoreDataService,
    private authSvc: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwt')
    this.isLoggedIn = this.authSvc.isLoggedIn
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
    // call server for qr-url for accepter to scan

    // redirect? closable popup for qr image?
  }
}
