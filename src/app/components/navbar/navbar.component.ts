import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription, filter } from 'rxjs';
import { JwtApiService } from 'src/app/services/jwt-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed = true
  searchForm!: FormGroup
  isLoggedIn!: boolean
  loginSub$!: Subscription

  constructor(
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private jwtSvc: JwtApiService) { }

  ngOnDestroy(): void {
    this.loginSub$.unsubscribe()
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: this.fb.control<string>('', [Validators.required]),
    })
    this.loginSub$ = this.jwtSvc.LoginObs().subscribe(() => {
      const token = localStorage.getItem('jwt');
      this.isLoggedIn = !!token && !this.jwtHelper.isTokenExpired(token);
      if (this.jwtHelper.isTokenExpired(token)){
        localStorage.removeItem('jwt')
      }
    })
  }

  logout() {
    localStorage.removeItem('jwt')
    this.router.navigate(['/']).then(() => {
      window.location.reload()
    })
  }

  search() { }
}
