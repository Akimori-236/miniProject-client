import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private afMessaging: AngularFireMessaging,
    private http: HttpClient) {
    this.afMessaging.tokenChanges.subscribe(
      (onTokenChange) => {
        
      }
    )
  }

  requestPermission(): void {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        // Handle the retrieved FCM device token here
        console.log('FCM device token:', token);
        // Send the token to your server-side application for storage
        // via an HTTP request

      },
      (error) => {
        console.error('Error requesting token:', error);
      }
    );
  }
}
