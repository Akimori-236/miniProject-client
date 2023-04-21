import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SpringbootApiService } from 'src/app/services/springboot-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private springboot: SpringbootApiService,
    private router: Router,
    private authSvc: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}$")]),
      lastname: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}$")]),
      email: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    })
    if (localStorage.getItem("jwt") != null) {
      this.router.navigate(['/'])
    }
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

  async oauthRegister() {
    const firstname = this.registerForm.value['firstname'];
    const lastname = this.registerForm.value['lastname'];
    const email = this.registerForm.value['email'];
    const password = this.registerForm.value['password'];
    try {
      const user = await this.authSvc.googleSignIn(); // initiate Google sign-in process
      const token = user.getAuthResponse().id_token; // get the user's ID token
      console.log(token); // print the token to the console (for testing purposes)
      // send the token to your server for verification and user creation
      this.router.navigate(['/']); // navigate to the home page
    } catch (err) {
      console.error(err); // handle any errors that occur during the sign-in process
    }
  }
}
