import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  currentMessage = new Subject()

  constructor(
    private afMessaging: AngularFireMessaging,
    private http: HttpClient) {

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

  receiveMessage() {
    this.afMessaging.messages.subscribe(
      (payload) => {
        console.info("New message received: ", payload)
        this.currentMessage.next(payload)
      }
    )
  }
}
