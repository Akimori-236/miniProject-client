import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

const authURL = "/api/auth"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubj!: BehaviorSubject<User>
  public currentUserObs!: Observable<User>

  constructor(private http: HttpClient,
    private socialAuthSvc: SocialAuthService) {
    let localUser: string | null = localStorage.getItem('currentUser')
    if (localUser == null) {
      localUser = "{}"
    }
    this.currentUserSubj = new BehaviorSubject<User>(JSON.parse(localUser))
    this.currentUserObs = this.currentUserSubj.asObservable()
  }

  public get currentUserValue(): User {
    return this.currentUserSubj.value
  }

  login(email: string, password: string) {
    return this.http.post<any>(authURL + "/login", { email, password })
      .pipe(map(response => {
        // login successful if there's a jwt token in the response
        if (response && response.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const user: User = { email, token: response.token };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubj.next(user);
        }
        return response;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubj.next({});
  }

  isAuthenticated(): boolean {
    // check if there's a current user with a token
    return (this.currentUserValue != undefined) && (this.currentUserValue.token != undefined)
  }

  // async googleSignIn() {
  //   try {
  //     const googleProvider = new GoogleLoginProvider('869245493728-jcr4ussoue4u3eu7e020s37gvee8kp05.apps.googleusercontent.com');
  //     const user = await this.socialAuthSvc.signIn(googleProvider);
  //     return user;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}
