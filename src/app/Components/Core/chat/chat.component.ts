import { Component, OnInit } from '@angular/core';
import { ConversationDTO } from '../../../Interfaces/Chat/ConversationDTO';
import { MessageDTO } from '../../../Interfaces/Chat/MessageDTO';
import { ConversationListComponent } from "./conversation-list/conversation-list.component";
import { MessageListComponent } from "./message-list/message-list.component";
import { MessageInputComponent } from "./message-input/message-input.component";
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../Services/chat.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [ConversationListComponent, MessageListComponent, MessageInputComponent, CommonModule]
})
export class ChatComponent implements OnInit {
  currentConversation: ConversationDTO | null = null;
  showWelcomeState = true;
  sidebarOpen = false;
  currentUserId: string = '';

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.verify().subscribe({
      next: (response) => {
        this.currentUserId = response.id;
      },
      error: (error) => {
        console.error('Failed to verify user', error);
      }
    });
  }

  get currentConversationId(): string {
    return this.currentConversation?.id || '';
  }

  selectConversation(conversation: ConversationDTO) {
    this.currentConversation = conversation;
    this.showWelcomeState = false;
    if (window.innerWidth <= 768) {
      this.sidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onMessageSent(newMessage: MessageDTO) {
    if (this.currentConversation) {
      const existingMessages = Array.isArray(this.currentConversation.messages) ? this.currentConversation.messages : [];
      const updatedMessages = [...existingMessages, newMessage];
      this.currentConversation = {
        ...this.currentConversation,
        messages: updatedMessages,
        lastMessage: newMessage,
      };
    }
  }
}
