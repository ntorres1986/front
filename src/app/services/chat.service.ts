import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../app-settings';

import 'rxjs/add/operator/map'
import * as io from 'socket.io-client';
const socket = io(AppSettings.SOCKET_ENDPOINT);


//import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  getMessages() {
    let observable = new Observable(observer => {
      socket.on('message', (data) => {
        console.log("data",data);
        observer.next(data);    
      });
      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }  
   
}

