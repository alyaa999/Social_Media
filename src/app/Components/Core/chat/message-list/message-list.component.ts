// message-list.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { MessageDTO } from '../../../../Interfaces/Chat/MessageDTO';
import { ConversationDTO } from '../../../../Interfaces/Chat/ConversationDTO';
import { ChatService } from '../chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-list',
  imports: [CommonModule],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() conversation: ConversationDTO | null = null;
  messages: MessageDTO[] = [];
  currentUserId = 'user1'; // Replace with actual user ID from authentication service 

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadMessages();
  }

  ngOnChanges() {
    this.loadMessages();
  }

  loadMessages() {
    if (this.conversation?.id) {
      this.chatService.getMessages(this.conversation.id).subscribe(messages => {
        this.messages = messages;
        setTimeout(() => this.scrollToBottom(), 0);
      });
    }
  }

  scrollToBottom() {
    const container = document.getElementById('messages-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
}