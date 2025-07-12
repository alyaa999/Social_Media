import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ConversationDTO } from '../../../Interfaces/Chat/ConversationDTO';
import { SignalrService } from '../../../Services/signalr.service';
import { MessageDTO } from '../../../Interfaces/Chat/MessageDTO';
import { ConversationListComponent } from "./conversation-list/conversation-list.component";
import { MessageListComponent } from "./message-list/message-list.component";
import { MessageInputComponent } from "./message-input/message-input.component";
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../Services/chat.service';
import { AuthService } from '../../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserConversationsDTO } from '../../../Interfaces/Chat/UserConversationsDTO';
import { NewConversationDTO } from '../../../Interfaces/Chat/NewConversationDTO';
import { ConversationsPageRequestDTO } from '../../../Interfaces/Chat/ConversationsPageRequestDTO';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [ConversationListComponent, MessageListComponent, MessageInputComponent, CommonModule]
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild(ConversationListComponent) conversationList!: ConversationListComponent;
  currentConversation: ConversationDTO | null = null;
  showWelcomeState = true;
  sidebarOpen = false;
  currentUserId: string = '';

  constructor(
    private chatService: ChatService, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private signalrService: SignalrService
  ) {}

  ngOnInit(): void {
    this.authService.verify().subscribe({
      next: (response) => {
        this.currentUserId = response.id;
        this.signalrService.startConnection(this.currentUserId);
        this.setupSignalRListeners();
        this.handleRouteParams();
      },
      error: (error) => {
        console.error('Failed to verify user', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.signalrService.stopConnection();
  }

  private setupSignalRListeners(): void {
    this.signalrService.addReceivePrivateMessageListener((message: MessageDTO) => {
      if (this.conversationList) {
        const conversation = this.conversationList.conversations.find(c => c.id === message.conversationId);
        if (conversation) {
          conversation.messages = [...(conversation.messages || []), message];
          conversation.lastMessage = message;
          this.conversationList.updateConversation(conversation);

          if (this.currentConversation?.id === message.conversationId) {
            this.currentConversation = { ...conversation };
          }
        }
      }
    });
  }

  private handleRouteParams(): void {
    this.route.params.subscribe(params => {
      const otherId = params['otherId'];
      if (otherId) {
        this.findOrCreateConversation(otherId);
      }
    });
  }

  private findOrCreateConversation(otherId: string): void {
    const request: ConversationsPageRequestDTO = {
      next: '',
      pageSize: 100
    };

    // First, try to find an existing conversation with this user
    this.chatService.getUserConversations(request).subscribe((response: UserConversationsDTO) => {
      const existingConversation = response.conversations.find(conv => 
        !conv.isGroup && 
        conv.receiverProfile?.userId === otherId
      );

      if (existingConversation) {
        this.selectConversation(existingConversation);
      } else {
        // If no existing conversation, create a new one
        const newConversation: NewConversationDTO = {
          isGroup: false,
          participants: [otherId]
        };
        
        this.chatService.createConversation(newConversation).subscribe({
          next: (createdConversation) => {
            this.selectConversation(createdConversation);
            if (this.conversationList) {
              this.conversationList.addConversation(createdConversation);
            }
          },
          error: (error) => {
            console.error('Error creating conversation:', error);
          }
        });
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
