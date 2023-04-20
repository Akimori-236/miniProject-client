import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpringbootApiService } from 'src/app/services/springboot-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private springboot: SpringbootApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required]),
    })
    if (localStorage.getItem("jwt") != null) {
      this.router.navigate(['/'])
    }
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
}
