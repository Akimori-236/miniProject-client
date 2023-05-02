import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { timeout } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  registerForm!: FormGroup
  isLoggedIn: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService,
    private _ngZone: NgZone) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}$")]),
      lastname: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}$")]),
      email: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    })

    this.isLoggedIn = this.authSvc.isLoggedIn
    if (this.authSvc.isLoggedIn) {
      timeout(3000)
      this.router.navigate(['/']).then(() => {
        window.location.reload()
      })
    }
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: '869245493728-jcr4ussoue4u3eu7e020s37gvee8kp05.apps.googleusercontent.com',
      context: "signup",
      // can only have either ballback or login_uri NOT BOTH
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false, // autoselects first google account of user to login
      cancel_on_tap_outside: true, // cancel if user clicks outside of popup
      log_level: "debug"
    })
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large", width: "100%" }
    )
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => { })

  }

  ngAfterViewInit(): void {
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large", width: "100%" }
    )
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => { })
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.authSvc.googleLogin(response.credential).subscribe(
      (creds: any) => {
        localStorage.setItem("token", creds.token) // save google token
        this._ngZone.run(() => {
          this.router.navigate(['/logout']) // send user to whatever page after logged in
        })
      },
      // (error: any) => {
      //   console.debug(error)
      // }
    )
  }

  register() {
    const firstname = this.registerForm.value['firstname']
    const lastname = this.registerForm.value['lastname']
    const email = this.registerForm.value['email']
    const password = this.registerForm.value['password']
    // this.jwtSvc.register(firstname, lastname, email, password)
    //   .then(response => {
    //     console.log(response)
    //     localStorage.setItem("jwt", response['jwt'])
    //     this.router.navigate(['/'])
    //   })
    //   .catch(err => console.error(err))
  }

  googleRegister() {

  }
}
