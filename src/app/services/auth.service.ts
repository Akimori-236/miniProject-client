import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN_NAME = "jwt"

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService) { }

  // TODO: CHECK JWT EXPIRY

  get JWT() {
    const token = localStorage.getItem(this.JWT_TOKEN_NAME)
    if (token != null && this.jwtHelper.isTokenExpired(token)) {
      console.warn("JWT expired")
      this.logout()
      return null
    } else {
      return token
    }
  }

  get isLoggedIn(): boolean { return !!this.JWT }

  get isLoggedIn$(): Observable<boolean> {
    return (new BehaviorSubject<boolean>(this.isLoggedIn))
      .asObservable()
  }

  get givenname() {
    if (null != this.JWT) {
      const decodedJWT: any = jwt_decode(this.JWT)
      return decodedJWT['givenname']
    } else {
      return ""
    }
  }

  get JWTHeaders() {
    return new HttpHeaders().set("Authorization", `Bearer ${this.JWT}`)
  }

  register(givenname: string, familyname: string, email: string, password: string): Promise<any> {
    const body = { givenname, familyname, email, password }
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
    localStorage.removeItem(this.JWT_TOKEN_NAME)
    console.log("JWT Deleted")
    this.router.navigate(['/'])
    // .then(() => {
    //   window.location.reload()
    // })
  }

}
