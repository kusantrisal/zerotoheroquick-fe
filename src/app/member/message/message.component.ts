import { Component, OnInit } from '@angular/core';

export interface message {
  from: string;
  subject: string;
  content: string;
  lastMessage: Number;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages: message[] = [];
  openConversationFlag: boolean = false;
  conversation: string[] = [];
  messageInput;
  constructor() { }

  ngOnInit(): void {
    this.messages.push({ from: 'Kush', subject: 'some subject', content: 'I really hope that this app will be viral like facebook', lastMessage: Date.now() });
    this.messages.push({ from: 'Kush', subject: 'some subject', content: 'I really hope that this app will be viral like facebook', lastMessage: Date.now() });
    this.messages.push({ from: 'Kush', subject: 'some subject', content: 'I really hope that this app will be viral like facebook', lastMessage: Date.now() });
    this.messages.push({ from: 'Kush', subject: 'some subject', content: 'I really hope that this app will be viral like facebook', lastMessage: Date.now() });

    for (let index = 0; index < 20; index++) {
      this.conversation.push('Hello h r u');

    }
  }

  openConversationSwitch() {
    this.openConversationFlag = !this.openConversationFlag
  }

  sendMessage() {
    this.conversation.push(this.messageInput);
  }
}
