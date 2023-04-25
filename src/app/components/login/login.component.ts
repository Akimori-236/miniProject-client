import { GoogleLoginProvider, SocialAuthService, SocialUser, GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { JwtApiService } from 'src/app/services/jwt-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup
  loginSub$!: Subscription
  socialUser!: SocialUser
  isLoggedIn!: boolean

  constructor(
    private fb: FormBuilder,
    private jwtSvc: JwtApiService,
    private router: Router,
    private socialAuthSvc: SocialAuthService,
    private jwtHelper: JwtHelperService,) { }

  ngOnDestroy(): void {
    this.loginSub$.unsubscribe()
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required]),
    })
    // observe the login state
    this.loginSub$ = this.jwtSvc.LoginObs().subscribe(() => {
      const token = localStorage.getItem('jwt');
      this.isLoggedIn = !!token && !this.jwtHelper.isTokenExpired(token);
    })
  }

  login() {
    const email = this.loginForm.value['email']
    const password = this.loginForm.value['password']
    this.jwtSvc.login(email, password)
      .then(response => {
        console.log(response)
        localStorage.setItem("jwt", response['jwt'])
        this.router.navigate(['/borrowed'])
      })
      .catch(err => console.error(err))
  }

  loginWithGoogle() {
    this.socialAuthSvc.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        // On success, redirect to the home page
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  logout() {
    this.socialAuthSvc.signOut()
  }
}
