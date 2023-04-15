import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpringbootApiService {

  constructor(private http: HttpClient) { }

  register(firstname: string, lastname: string, email: string, password: string): Promise<any> {
    const body = { firstname, lastname, email, password }
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
}
