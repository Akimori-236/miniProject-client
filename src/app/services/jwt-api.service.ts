import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtApiService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  register(firstname: string, lastname: string, email: string, password: string): Promise<any> {
    const body = { firstname, lastname, email, password }
    return firstValueFrom(
      this.http.post<any>("/api/auth/register", body)
    )
  }

  registerGoogle(firstname: string, lastname: string, email: string, idToken: string): Promise<any> {
    const body = { firstname, lastname, email, idToken }
    return firstValueFrom(
      this.http.post<any>("/api/auth/register/google", body)
    )
  }

  login(email: string, password: string): Promise<any> {
    const body = { email, password }
    return firstValueFrom(
      this.http.post<any>("/api/auth/login", body)
    )
  }

  LoginObs(): Observable<any> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    )
  }

}
