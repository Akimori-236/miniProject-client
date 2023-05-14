import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Instrument } from '../models/instrument';
import { Store } from '../models/store';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class StoreDataService {
    RAILWAY_URL: string = "https://mp-server-production.up.railway.app"
    DATA_URL: string = this.RAILWAY_URL + "/api/data/"

    constructor(private http: HttpClient, private authSvc: AuthService) { }

    getBorrowed(): Promise<Instrument[]> {
        const headers = this.authSvc.JWTHeaders
        // const params = new HttpParams().set("email", email)
        return firstValueFrom(
            this.http.get<Instrument[]>(`${this.DATA_URL}borrowed`, { headers })
        )
    }

    createStore(storeName: string): Promise<any> {
        const headers = this.authSvc.JWTHeaders
        let params = new HttpParams().set("storename", storeName)
        return firstValueFrom(
            this.http.post<any>(this.DATA_URL + "store/create", {}, { headers, params })
        )
    }

    getManagedStores(): Promise<Store[]> {
        const headers = this.authSvc.JWTHeaders
        return firstValueFrom(
            this.http.get<Store[]>(this.DATA_URL + "store", { headers })
        )
    }

    getStoreDetails(storeID: string): Promise<any> {
        // console.log(storeID)
        const headers = this.authSvc.JWTHeaders
        return firstValueFrom(
            this.http.get<any>(this.DATA_URL + `store/${storeID}`, { headers })
        )
    }

    addNewInstrument(storeID: string, body: Instrument): Promise<any> {
        console.info(body)
        const headers = this.authSvc.JWTHeaders.set('Content-Type', 'application/json')
        return firstValueFrom(
            this.http.post<any>(this.DATA_URL + `store/${storeID}/addinstrument`, { body }, { headers })
        )
    }


}
