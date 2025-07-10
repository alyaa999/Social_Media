// chat.component.ts
import { Component } from '@angular/core';
import { ConversationDTO } from '../../../Interfaces/Chat/ConversationDTO';
import { ChatService } from './chat.service';
import { ConversationListComponent } from "./conversation-list/conversation-list.component";
import { MessageListComponent } from "./message-list/message-list.component";
import { MessageInputComponent } from "./message-input/message-input.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [ConversationListComponent, MessageListComponent, MessageInputComponent,CommonModule]
})
export class ChatComponent {
  currentConversation: ConversationDTO | null = null;
  showWelcomeState = true;
  sidebarOpen = false;

  constructor(private chatService: ChatService) {}

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
}