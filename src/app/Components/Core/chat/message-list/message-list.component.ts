// message-list.component.ts
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { MessageDTO } from '../../../../Interfaces/Chat/MessageDTO';
import { ConversationDTO } from '../../../../Interfaces/Chat/ConversationDTO';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../../Services/chat.service';
import { MessagesPageRequestDTO } from '../../../../Interfaces/Chat/MessagesPageRequestDTO';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() conversation: ConversationDTO | null = null;
  messages: MessageDTO[] = [];
  @Input() currentUserId: string | null = null;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    if (this.conversation) {
      this.messages = this.conversation.messages || [];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['conversation'] && changes['conversation'].currentValue) {
      this.messages = changes['conversation'].currentValue.messages || [];
      this.loadMessages();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
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

  scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}
