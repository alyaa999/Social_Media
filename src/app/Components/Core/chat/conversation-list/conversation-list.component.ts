// conversation-list.component.ts
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ConversationDTO } from '../../../../Interfaces/Chat/ConversationDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../Services/profile.service';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnChanges {
  @Input() currentConversation: ConversationDTO | null = null;
  @Input() updatedConversation: ConversationDTO | null = null;
  @Input() conversations: ConversationDTO[] = [];
  @Input() currentUserId: string = '';
  searchTerm = '';
  @Output() conversationSelected = new EventEmitter<ConversationDTO>();

  constructor(private profileService: ProfileService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['updatedConversation'] && changes['updatedConversation'].currentValue) {
      this.updateConversation(changes['updatedConversation'].currentValue);
    }
    if (changes['conversations'] && changes['conversations'].currentValue) {
      this.processConversations(this.conversations);
    }
  }

  processConversations(convs: ConversationDTO[]) {
    const userId = localStorage.getItem('userId');

    convs.forEach(element => {
      if (!element.isGroup && !element.receiverProfile) {
        const receiverId = element.participants.find(p => p !== userId);
        if (receiverId) {
          this.profileService.GetProfileByUserIdMin(receiverId).subscribe(profile => {
            element.receiverProfile = profile.data;
          });
        }
      }
    });
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


  onConversationSelected(conversation: ConversationDTO) {
    this.conversationSelected.emit(conversation);
  }

  get filteredConversations() {
    if (!this.searchTerm) {
      return this.conversations;
    }
    return this.conversations.filter(conv => {
      const term = this.searchTerm.toLowerCase();
      if (conv.isGroup) {
        return conv.groupName?.toLowerCase().includes(term);
      } else {
        return conv.receiverProfile?.displayName?.toLowerCase().includes(term) ||
               conv.receiverProfile?.userName?.toLowerCase().includes(term);
      }
    });
  }
}
