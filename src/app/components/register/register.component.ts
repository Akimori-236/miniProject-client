import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpringbootApiService } from 'src/app/services/springboot-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup
  private accessToken = ""

  constructor(
    private fb: FormBuilder,
    private springboot: SpringbootApiService,
    private router: Router,
    private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}$")]),
      lastname: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}$")]),
      email: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    })
    // if (localStorage.getItem("jwt") != null) {
    //   this.router.navigate(['/'])
    // }
    // show "already logged in", timeout and then redirect
  }

  register() {
    const firstname = this.registerForm.value['firstname']
    const lastname = this.registerForm.value['lastname']
    const email = this.registerForm.value['email']
    const password = this.registerForm.value['password']
    this.springboot.register(firstname, lastname, email, password)
      .then(response => {
        console.log(response)
        localStorage.setItem("jwt", response['jwt'])
        this.router.navigate(['/'])
      })
      .catch(err => console.error(err))
  }

  // GOOGLE AUTH
  // getAccessToken(): void {
  //   this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  // }

  // // REVOKED?
  // // refreshToken(): void {
  // //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // // }

  // async googleRegister() {
  //   try {
  //     const user = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  //     const token = user.authToken; // Get the user's authentication token
  //     console.log(token); // Log the token to the console (for testing purposes)
  //     // Send the token to your server for verification and user creation
  //   } catch (err) {
  //     console.error(err); // Handle any errors that occur during the sign-in process
  //   }
  // }
}
