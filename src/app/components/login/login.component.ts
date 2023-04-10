import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private springboot: SpringbootApiService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required]),
    })
  }

  login() {
    const email = this.loginForm.value['email']
    const password = this.loginForm.value['password']
    // should encrypt before sending
    // this.
  }

  encrypt() { }
}
