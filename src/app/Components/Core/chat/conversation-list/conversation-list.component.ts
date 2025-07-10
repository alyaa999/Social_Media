// conversation-list.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConversationDTO } from '../../../../Interfaces/Chat/ConversationDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../../Services/chat.service';
import { ConversationsPageRequestDTO } from '../../../../Interfaces/Chat/ConversationsPageRequestDTO';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
  @Input() currentConversation: ConversationDTO | null = null;
  conversations: ConversationDTO[] = [];
  searchTerm = '';
  @Output() conversationSelected = new EventEmitter<ConversationDTO>();

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadConversations();
  }

  loadConversations() {
    const conversationpageRequest: ConversationsPageRequestDTO = {
   
      next:'',
      pageSize: 20,
    }
    this.chatService.getUserConversations(conversationpageRequest).subscribe(convs => {
      this.conversations = convs.conversations;
      console.log('Conversations loaded:', this.conversations);
      if (this.conversations.length > 0) {
        this.currentConversation = this.conversations[0];
        this.onConversationSelected(this.currentConversation);
      }
    }, error => {
      console.error('Error loading conversations:', error);
    });
  }

  onConversationSelected(conversation: ConversationDTO) {
    this.conversationSelected.emit(conversation);
  }

  get filteredConversations() {
    return this.conversations.filter(conv => 
      (conv.groupName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
      (!conv.isGroup && conv.lastMessage?.senderProfile?.displayName?.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (conv.lastMessage?.content?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false)
    );
  }
}