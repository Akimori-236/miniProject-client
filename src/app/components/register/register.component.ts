import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtApiService } from 'src/app/services/jwt-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup
  private accessToken = ""
  authSub$!: Subscription
  socialUser!: SocialUser
  isLoggedIn!: boolean

  constructor(
    private fb: FormBuilder,
    private jwtSvc: JwtApiService,
    private router: Router,
    private socialAuthService: SocialAuthService) { }

  ngOnDestroy(): void {
    // this.authSub$.unsubscribe()
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}$")]),
      lastname: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}$")]),
      email: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    })
    // GOOGLE LOGIN
    this.authSub$ = this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user
      this.isLoggedIn = user != null
      console.log(this.socialUser)
    })
    if (this.isLoggedIn) {
      this.accessToken = this.socialUser.idToken
      this.jwtSvc.register(this.socialUser.firstName, this.socialUser.lastName, this.socialUser.email, this.socialUser.idToken)
        .then(response => {
          console.log(response)
          localStorage.setItem("jwt", response['jwt'])
          this.router.navigate(['/borrowed'])
        })
        .catch(err => console.error(err))
      // send to SB for JWT and then redirect
    }
  }

  register() {
    const firstname = this.registerForm.value['firstname']
    const lastname = this.registerForm.value['lastname']
    const email = this.registerForm.value['email']
    const password = this.registerForm.value['password']
    this.jwtSvc.register(firstname, lastname, email, password)
      .then(response => {
        console.log(response)
        localStorage.setItem("jwt", response['jwt'])
        this.router.navigate(['/borrowed'])
      })
      .catch(err => console.error(err))
  }

  registerWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(resp => console.log(resp))
      .catch(error => console.warn(error))
  }
  logout() {
    this.socialAuthService.signOut()
      .then(res => console.log("Logged out"))
      .catch(error => console.warn("Not logged in"))
  }
}
