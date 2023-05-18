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
    private DATA_URL: string = "/api/data/"

    constructor(private http: HttpClient, private authSvc: AuthService) { }

    getBorrowed(): Promise<Instrument[]> {
        const headers = this.authSvc.JWTHeaders
        headers.set("Content-Type", "application/json")
        return firstValueFrom(
            this.http.get<Instrument[]>(`${this.DATA_URL}borrowed`, { headers })
        )
    }

    createStore(storeName: string): Promise<string> {
        const headers = this.authSvc.JWTHeaders
        headers.set("Content-type", "application/json")
        let params = new HttpParams().set("storename", storeName)
        return firstValueFrom(
            this.http.post<string>(this.DATA_URL + "store/create", {}, { headers, params })
        )
    }

    getManagedStores(): Promise<Store[]> {
        const headers = this.authSvc.JWTHeaders
        headers.set("Content-type", "application/json")
        return firstValueFrom(
            this.http.get<Store[]>(this.DATA_URL + "store", { headers })
        )
    }

    getStoreDetails(storeID: string): Promise<any> {
        // console.log(storeID)
        const headers = this.authSvc.JWTHeaders
        headers.set("Content-type", "application/json")
        return firstValueFrom(
            this.http.get<any>(this.DATA_URL + `store/${storeID}`, { headers })
        )
    }

    addNewInstrument(storeID: string, body: Instrument): Promise<null> {
        console.info(body)
        const headers = this.authSvc.JWTHeaders.set('Content-Type', 'application/json')
        return firstValueFrom(
            this.http.post<null>(this.DATA_URL + `store/${storeID}/addinstrument`, { body }, { headers })
        )
    }

    sendInviteManager(storeID: string, managerEmail: string): Promise<string> {
        const headers = this.authSvc.JWTHeaders.set('Content-Type', 'application/json')
        let params = new HttpParams().set("managerEmail", managerEmail)
        return firstValueFrom(
            this.http.post<string>(this.DATA_URL + `store/${storeID}/invitemanager`, { headers, params })
        )
    }

    updateInstrument(body: Instrument) {
        console.info(body)
        const headers = this.authSvc.JWTHeaders.set('Content-Type', 'application/json')
        return firstValueFrom(
            this.http.put<null>(this.DATA_URL + `store/updateinstrument`, { body }, { headers })
        )
    }

    getInstrument(id: string): Promise<Instrument> {
        const headers = this.authSvc.JWTHeaders.set('Content-Type', 'application/json')
        return firstValueFrom(
            this.http.get<Instrument>(this.DATA_URL + `instrument/${id}`, { headers })
        )
    }
}
