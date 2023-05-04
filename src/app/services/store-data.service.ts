import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Instrument } from '../models/instrument';
import { Store } from '../models/store';

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
    )
  }

  getManagedStores(): Promise<Store[]> {
    const token = localStorage.getItem("jwt")
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return firstValueFrom(
      this.http.get<Store[]>("/api/data/store/managers", { headers })
    )
  }
}
