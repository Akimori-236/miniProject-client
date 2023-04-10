import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpringbootApiService {

  constructor(private http: HttpClient) { }

  login(): Promise<any> {
    
    return firstValueFrom(
      this.http.post("/api/login", "")
    )
  }
}
