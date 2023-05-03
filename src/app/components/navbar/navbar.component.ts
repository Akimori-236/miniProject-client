import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  isCollapsed: boolean = true
  isLoggedIn: boolean = false
  searchForm!: FormGroup
  givenname!: string
  // User: User

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService,) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      // console.log(event instanceof NavigationEnd)
      this.isLoggedIn = this.authSvc.isLoggedIn
      this.givenname = this.authSvc.givenname
    })
    this.searchForm = this.fb.group({
      search: this.fb.control<string>('', [Validators.required]),
    })

  }

  logout() {
    this.authSvc.logout()
  }

  search() { }
}
