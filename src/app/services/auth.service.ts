import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,) { }

  get isLoggedIn() {
    return !!localStorage.getItem('jwt')
  }

  get firstname() {
    const token = localStorage.getItem('jwt')
    if (null != token) {
      const decodedJWT: any = jwt_decode(token)
      return decodedJWT['firstname']
    } else {
      return ""
    }
  }

  register(firstname: string, lastname: string, email: string, password: string): Promise<any> {
    const body = { firstname, lastname, email, password }
    return firstValueFrom(
      this.http.post<any>("/api/auth/register", body)
    )
  }

  // check if google token is real in backend
  googleLogin(credentials: string): Observable<any> {
    console.info(credentials)
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
    return (this.http.post("/api/auth/LoginWithGoogle", JSON.stringify(credentials), { headers }))
  }

  login(email: string, password: string): Promise<any> {
    const body = { email, password }
    return firstValueFrom(
      this.http.post<any>("/api/auth/login", body)
    )
  }

  logout() {
    localStorage.removeItem('jwt')
    console.log("JWT Deleted")
    this.router.navigate(['/']).then(() => {
      window.location.reload()
    })
  }
}
