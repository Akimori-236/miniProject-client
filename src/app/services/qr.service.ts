import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  // RAILWAY_URL: string = "https://mp-server-production.up.railway.app"
  QR_URL: string = "/api/qr/";

  constructor(private http: HttpClient, private authSvc: AuthService) { }

  getLoanQR(instrument_id: string, storeID: string): Promise<any> {
    console.info("Getting QR for loaning out: " + instrument_id)
    const headers = this.authSvc.JWTHeaders
    // .set('Accept', 'image/png')
    return firstValueFrom(
      this.http.get<any>(`${this.QR_URL}${storeID}/loanout/${instrument_id}`, { headers, responseType: 'blob' as 'json' })
    )
  }
}
