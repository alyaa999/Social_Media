// message-list.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { MessageDTO } from '../../../../Interfaces/Chat/MessageDTO';
import { ConversationDTO } from '../../../../Interfaces/Chat/ConversationDTO';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../../Services/chat.service';
import { MessagesPageRequestDTO } from '../../../../Interfaces/Chat/MessagesPageRequestDTO';

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
      const messagepageRequest: MessagesPageRequestDTO = {
        conversationId: this.conversation.id,
        next: "",
        pageSize: 20
      };
      this.chatService.getMessagesPage(messagepageRequest).subscribe(messages => {
        this.messages = messages.messages;
        console.log('Messages loaded:', this.messages);
        this.scrollToBottom();
      }, error => {
        console.error('Error loading messages:', error);
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