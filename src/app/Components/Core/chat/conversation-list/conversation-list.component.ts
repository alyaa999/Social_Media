// conversation-list.component.ts
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ConversationDTO } from '../../../../Interfaces/Chat/ConversationDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../../Services/chat.service';
import { ConversationsPageRequestDTO } from '../../../../Interfaces/Chat/ConversationsPageRequestDTO';
import { ProfileService } from '../../../../Services/profile.service';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit, OnChanges {
  @Input() currentConversation: ConversationDTO | null = null;
  @Input() updatedConversation: ConversationDTO | null = null;
  conversations: ConversationDTO[] = [];
  searchTerm = '';
  @Output() conversationSelected = new EventEmitter<ConversationDTO>();

  constructor(private chatService: ChatService, private profileService: ProfileService) { }

  ngOnInit() {
    this.loadConversations();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['updatedConversation'] && changes['updatedConversation'].currentValue) {
      this.updateConversation(changes['updatedConversation'].currentValue);
    }
  }

  updateConversation(updatedConv: ConversationDTO) {
    const index = this.conversations.findIndex(c => c.id === updatedConv.id);
    if (index !== -1) {
      this.conversations[index] = updatedConv;
      // Move the updated conversation to the top of the list
      this.conversations.splice(index, 1);
      this.conversations.unshift(updatedConv);
    }
  }

  addConversation(conversation: ConversationDTO) {
    this.conversations.unshift(conversation);
  }

  loadConversations() {
    const conversationpageRequest: ConversationsPageRequestDTO = {

      next: '',
      pageSize: 20,
    }
    this.chatService.getUserConversations(conversationpageRequest).subscribe(convs => {
      this.conversations = convs.conversations;

      const userId = localStorage.getItem('userId');

      this.conversations.forEach(element => {
        if (!element.isGroup) {
          const receiver = (element?.participants ? element.participants[0] : " ") === userId ? (element?.participants ? element.participants[1] : " ") : (element?.participants ? element.participants[0] : " ");
          this.profileService.GetProfileByUserIdMin(receiver).subscribe(profile => {
            element.receiverProfile = profile.data;
          });
        }
      });
      if (this.conversations.length > 0) {
        this.currentConversation = this.conversations[0];
        this.onConversationSelected(this.currentConversation);
      }
      console.log('Conversations loaded:', this.conversations);
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
