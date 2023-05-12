import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { AuthService } from 'src/app/services/auth.service';
// Google gives you back CredentialResponses

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  isLoggedIn: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService,
    private _ngZone: NgZone) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required]),
    })

    this.isLoggedIn = this.authSvc.isLoggedIn
    if (this.authSvc.isLoggedIn) {
      this.router.navigate(['/']).then(() => {
        window.location.reload()
      })
    }
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: '869245493728-jcr4ussoue4u3eu7e020s37gvee8kp05.apps.googleusercontent.com',
      context: "signin",
      // can only have either ballback or login_uri NOT BOTH
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false, // autoselects first google account of user to login
      cancel_on_tap_outside: true // cancel if user clicks outside of popup
    })
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("googleBtn"),
      { theme: "filled_blue", text: "signin_with", shape: "rectangular" }
    )
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => { })

  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.authSvc.googleLogin(response.credential)
      .then((response) => {
        console.log(response)
        localStorage.setItem("jwt", response['jwt'])
        this._ngZone.run(() => {
          this.router.navigate(['/borrowed']) // send user to whatever page after logged in
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  login() {
    const email = this.loginForm.value['email']
    const password = this.loginForm.value['password']
    this.authSvc.login(email, password)
      .then(response => {
        console.log(response)
        localStorage.setItem("jwt", response['jwt'])
        this.router.navigate(['/borrowed'])
      })
      .catch(error => {
        console.error(error)
        window.alert(error)
      })
  }

   // TODO: grey out or show loading circle when loading
}