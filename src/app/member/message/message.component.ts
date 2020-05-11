import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SocketService } from 'src/app/shared/socket/socket.service';

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
export class MessageComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  scrolltop: number = null
  messages: message[] = [];
  openConversationFlag: boolean = false;
  conversation: string[] = [];
  messageInput;
  socketId: string = '';
  searchForm = this.fb.group({
    searchName: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.messages.push({ from: 'Kush', subject: 'some subject', content: 'I really hope that this app will be viral like facebook', lastMessage: Date.now() });
    this.messages.push({ from: 'Kush', subject: 'some subject', content: 'I really hope that this app will be viral like facebook', lastMessage: Date.now() });
    this.messages.push({ from: 'Kush', subject: 'some subject', content: 'I really hope that this app will be viral like facebook', lastMessage: Date.now() });
    this.messages.push({ from: 'Kush', subject: 'some subject', content: 'I really hope that this app will be viral like facebook', lastMessage: Date.now() });


    for (let index = 0; index < 20; index++) {
      this.conversation.push('Hello h r u');
    }
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  openConversationSwitch() {
    this.openConversationFlag = !this.openConversationFlag;
  }

  sendMessage() {
    this.conversation.push(this.messageInput);
    this.socketService.sendMessage({socketId: this.socketId, body: this.messageInput});
    this.messageInput = '';
  }

  search() {

  }
}
