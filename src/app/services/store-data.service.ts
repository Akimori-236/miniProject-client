import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, firstValueFrom } from 'rxjs';
import { Instrument } from '../models/instrument';

@Injectable({
  providedIn: 'root'
})
export class StoreDataService {

  constructor(private http: HttpClient) { }

  getBorrowed(): Promise<Instrument[]> {
    const token = localStorage.getItem("jwt")
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    // const params = new HttpParams().set("email", email)
    return firstValueFrom(
      this.http.get<Instrument[]>("/api/data/borrowed", { headers })
    );
  }

}
