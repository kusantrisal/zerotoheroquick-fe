import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {

  socket;

  constructor() { }

  ngOnInit(): void {
  }

  connect() {
    this.socket = io('ws://localhost:3000', {
      query: { token: localStorage.getItem('access_token') }
    });
    this.startListeningToServer();
  }

  disconnect() {
    this.socket.disconnect();
  }

  test() {
    console.log('Initializing socket connection')
    //initilize the connection with the server
    this.socket.emit('INITIALIZE_CONNECTION', { message: 'test' }, (data) => {

      //start listening to the message from server
      console.log(data)
    });
  }

  startListeningToServer() {
    fromEvent(this.socket, 'SERVER_TO_CLIENT').subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  sendMessage(message) {
    this.socket.emit('CLIENT_TO_SERVER', message, (data) => {
      console.log(data);
    })
  }

}
