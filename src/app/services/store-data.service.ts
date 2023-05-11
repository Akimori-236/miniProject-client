import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Instrument } from '../models/instrument';
import { Store } from '../models/store';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class StoreDataService {

    constructor(private http: HttpClient, private authSvc: AuthService) { }

    get JWTHeaders() {
        return new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`)
    }

    getBorrowed(): Promise<Instrument[]> {
        const headers = this.JWTHeaders
        // const params = new HttpParams().set("email", email)
        return firstValueFrom(
            this.http.get<Instrument[]>("/api/data/borrowed", { headers })
        )
    }

    createStore(storeName: string): Promise<any> {
        const headers = this.JWTHeaders
        let params = new HttpParams().set("storename", storeName)
        return firstValueFrom(
            this.http.post<any>("/api/data/store/create", {}, { headers, params })
        )
    }

    getManagedStores(): Promise<Store[]> {
        const headers = this.JWTHeaders
        return firstValueFrom(
            this.http.get<Store[]>("/api/data/store", { headers })
        )
    }

    getStoreDetails(storeID: string): Promise<any> {
        // console.log(storeID)
        const headers = this.JWTHeaders
        return firstValueFrom(
            this.http.get<Store[]>(`/api/data/store/${storeID}`, { headers })
        )
    }

    addNewInstrument(storeID: string, body: Instrument): Promise<any> {
        console.info(body)
        const headers = this.JWTHeaders.set('Content-Type', 'application/json')
        return firstValueFrom(
            this.http.post<any>(`/api/data/store/${storeID}/addinstrument`, { body }, { headers })
        )
    }
}
