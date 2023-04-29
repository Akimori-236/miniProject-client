import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { JwtApiService } from 'src/app/services/jwt-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed = true // for the hamburger menu
  searchForm!: FormGroup // remove if not used
  isLoggedIn: boolean = false
  loginSub$!: Subscription
  username!: string

  constructor(
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private jwtSvc: JwtApiService,
    private socialAuthService: SocialAuthService,) { }

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
      if (this.jwtHelper.isTokenExpired(token)) {
        localStorage.removeItem('jwt')
      }
    })
  }

  logout() {
    this.socialAuthService.signOut()
    localStorage.removeItem('jwt')
    this.router.navigate(['/']).then(() => {
      window.location.reload()
    })
  }

  search() { }
}
