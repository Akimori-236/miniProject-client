import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
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

  // TODO: CHECK JWT EXPIRY

  get isLoggedIn() {
    return !!localStorage.getItem('jwt')
  }

  get givenname() {
    const token = localStorage.getItem('jwt')
    if (null != token) {
      const decodedJWT: any = jwt_decode(token)
      return decodedJWT['givenname']
    } else {
      return ""
    }
  }

  register(givenname: string, familyname: string, email: string, password: string): Promise<any> {
    const body = { givenname, familyname, email, password, isGoogleLogin: false }
    return firstValueFrom(
      this.http.post<any>("/api/auth/register", body)
    )
  }

  login(email: string, password: string): Promise<any> {
    const body = { email, password }
    return firstValueFrom(
      this.http.post<any>("/api/auth/login", body)
    )
  }

  // check if google token is real in backend
  googleRegister(credentials: string): Promise<any> {
    console.info(credentials)
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
    // send google idToken to springboot
    return firstValueFrom(this.http.post("/api/auth/googleregister", credentials, { headers }))
  }

  // check if google token is real in backend
  googleLogin(credentials: string): Promise<any> {
    console.info(credentials)
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
    // send google idToken to springboot
    return firstValueFrom(this.http.post("/api/auth/googlelogin", credentials, { headers }))
  }

  logout() {
    localStorage.removeItem('jwt')
    console.log("JWT Deleted")
    this.router.navigate(['/'])
    // .then(() => {
    //   window.location.reload()
    // })
  }

}
