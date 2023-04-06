import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  links = [
    { title: 'Main', fragment: '/' },
    { title: 'Page1', fragment: '/page1' },
    { title: 'Login', fragment: '/login' }
  ];

  constructor(public route: ActivatedRoute) { }
}
