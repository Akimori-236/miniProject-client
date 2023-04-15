import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private springboot: SpringbootApiService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}$")]),
      lastname: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}$")]),
      email: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    })
  }

  register() {
    const firstname = this.registerForm.value['firstname']
    const lastname = this.registerForm.value['lastname']
    const email = this.registerForm.value['email']
    const password = this.registerForm.value['password']
    this.springboot.register(firstname, lastname, email, password)
      .then(response => console.log(response))
      .catch(err => console.error(err))
  }
}
