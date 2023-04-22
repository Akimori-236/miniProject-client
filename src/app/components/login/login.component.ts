import { GoogleLoginProvider, SocialAuthService, SocialUser, GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpringbootApiService } from 'src/app/services/springboot-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup
  socialSub$!: Subscription
  socialUser!: SocialUser
  isLoggedIn!: boolean

  constructor(
    private fb: FormBuilder,
    private springboot: SpringbootApiService,
    private router: Router,
    private socialAuthSvc: SocialAuthService) { }

  ngOnDestroy(): void {
    this.socialSub$.unsubscribe()
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required]),
    })
    this.socialSub$ = this.socialAuthSvc.authState.subscribe(
      (user) => {
        this.socialUser = user
        this.isLoggedIn = user != null
        console.log(this.socialUser)
      }
    )
    // show "already logged in", timeout and then redirect
  }

  login() {
    const email = this.loginForm.value['email']
    const password = this.loginForm.value['password']
    this.springboot.login(email, password)
      .then(response => {
        console.log(response)
        localStorage.setItem("jwt", response['jwt'])
        this.router.navigate(['/'])
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
