import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket; any;
  //readonly uri: string = "http://localhost:3000";
  readonly uri: string = "https://rmkato-socket-server.herokuapp.com";

  constructor() { 
    this.socket = io(this.uri);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  establishDatastream(){
    this.socket.emit("storeWebID", '');
  }

}
