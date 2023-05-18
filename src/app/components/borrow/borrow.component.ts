import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {
  instrumentID!: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeSvc: StoreDataService,
    private authSvc: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.instrumentID = this.activatedRoute.snapshot.params['instrumentid']
    const fullPath = this.activatedRoute.snapshot.url.toString();
    console.log(fullPath)
    if (this.authSvc.isLoggedIn) {

    } else {
      let queryParams = { queryParams: { fullPath } }
      this.router.navigate(['/login'], queryParams)
    }
  }



}
