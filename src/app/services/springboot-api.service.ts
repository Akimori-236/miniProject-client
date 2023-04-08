import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const SPRINGBOOT_URL: string = "###";

@Injectable({
  providedIn: 'root'
})
export class SpringbootApiService {

  constructor(private http: HttpClient) { }

  
}
