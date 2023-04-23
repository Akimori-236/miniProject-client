import { HttpClient, HttpParams } from '@angular/common/http';
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

  getBorrowed(email: string): Promise<any> {
    const params = new HttpParams()
      .set("email", email)
    // how to add jwt
    return firstValueFrom(
      this.http.post<any>("/api/data/borrowed", params)
    )
  }


}
