import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCollapsed = true
  searchForm!: FormGroup
  isLoggedIn!: boolean

  constructor(
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: this.fb.control<string>('', [Validators.required]),
    })
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      const token = localStorage.getItem('jwt');
      this.isLoggedIn = !!token && !this.jwtHelper.isTokenExpired(token);
    })
  }

  logout() {
    localStorage.removeItem('jwt')
    this.router.navigate(['/']).then(() => {
      window.location.reload()
    })
  }

  search() { }
}
