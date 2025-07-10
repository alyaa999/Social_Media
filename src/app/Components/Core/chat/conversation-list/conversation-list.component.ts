// conversation-list.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConversationDTO } from '../../../../Interfaces/Chat/ConversationDTO';
import { ChatService } from '../chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    this.chatService.getConversations().subscribe(convs => {
      this.conversations = convs;
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