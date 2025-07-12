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
import { ProfileService } from '../../../Services/profile.service';
import { UserConversationsDTO } from '../../../Interfaces/Chat/UserConversationsDTO';
import { NewConversationDTO } from '../../../Interfaces/Chat/NewConversationDTO';
import { ConversationsPageRequestDTO } from '../../../Interfaces/Chat/ConversationsPageRequestDTO';
import { MarkReadRequestDTO } from '../../../Interfaces/Chat/MarkReadRequestDTO';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [ConversationListComponent, MessageListComponent, MessageInputComponent, CommonModule]
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild(ConversationListComponent) conversationListComponent!: ConversationListComponent;
  allConversations: ConversationDTO[] = [];
  currentConversation: ConversationDTO | null = null;
  showWelcomeState = true;
  sidebarOpen = false;
  currentUserId: string = '';

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private signalrService: SignalrService,
    private profileService: ProfileService
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
      const isCurrentConversation = this.currentConversation?.id === message.conversationId;
      
      // If the message is for the currently open chat, mark it as read immediately.
      if (isCurrentConversation) {
        message.read = true;
        const markReadRequest: MarkReadRequestDTO = { conversationId: message.conversationId };
        this.chatService.markRead(markReadRequest).subscribe({
          error: (err) => console.error("Failed to mark message as read on the backend", err)
        });
      }

      let conversation = this.allConversations.find(c => c.id === message.conversationId);

      if (conversation) {
        // Update the conversation with the new message
        conversation.lastMessage = message;

        // If the conversation is open, add the message to its detailed view
        if (isCurrentConversation && this.currentConversation) {
          // Create a new object to trigger change detection in the message-list component
          this.currentConversation = {
            ...this.currentConversation,
            messages: [...(this.currentConversation.messages || []), message]
          };
        }

        // Move the updated conversation to the top of the list
        this.allConversations = this.allConversations.filter(c => c.id !== conversation!.id);
        this.allConversations.unshift(conversation);
      } else {
        // If the conversation is new, fetch its details from the server
        this.chatService.getConversationById(message.conversationId).subscribe({
          next: (newConversation) => {
            newConversation.lastMessage = message; // Ensure the very latest message is set
            this.allConversations.unshift(newConversation);
          },
          error: (error) => console.error('Error fetching new conversation:', error)
        });
      }
    });
  }

  private handleRouteParams(): void {
    this.route.params.subscribe(params => {
      const otherId = params['otherId'];
      // Load all conversations, and then check if we need to open a specific one.
      this.loadAndHandleConversations(otherId);
    });
  }

  private loadAndHandleConversations(otherId?: string): void {
    const request: ConversationsPageRequestDTO = {
      next: '',
      pageSize: 100 // Assuming a large enough page size to get all conversations
    };

    this.chatService.getUserConversations(request).subscribe((response: UserConversationsDTO) => {
      this.allConversations = response.conversations;

      // If an otherId is provided, find or create that specific conversation
      if (otherId) {
        const existingConversation = this.allConversations.find(conv =>
          !conv.isGroup &&
          conv.participants.includes(otherId)
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
              const otherUserId = createdConversation.participants.find(p => p !== this.currentUserId);
              if (otherUserId && !createdConversation.isGroup) {
                this.profileService.GetProfileByUserIdMin(otherUserId).subscribe(profile => {
                  createdConversation.receiverProfile = profile.data;
                  this.allConversations.unshift(createdConversation);
                  this.selectConversation(createdConversation);
                });
              } else {
                this.allConversations.unshift(createdConversation);
                this.selectConversation(createdConversation);
              }
            },
            error: (error) => {
              console.error('Error creating conversation:', error);
            }
          });
        }
      }
    });
  }

  get currentConversationId(): string {
    return this.currentConversation?.id || '';
  }

  selectConversation(conversation: ConversationDTO) {
    this.currentConversation = conversation;
    this.showWelcomeState = false;

    // Mark conversation as read
    if (this.currentConversation.lastMessage && !this.currentConversation.lastMessage.read) {
      const markReadRequest: MarkReadRequestDTO = {
        conversationId: this.currentConversation.id
      };
      this.chatService.markRead(markReadRequest).subscribe({
        next: () => {
          // Update the local state to reflect that the message is read
          if (this.currentConversation?.lastMessage) {
            this.currentConversation.lastMessage.read = true;
          }
          const convInList = this.allConversations.find(c => c.id === this.currentConversation?.id);
          if (convInList?.lastMessage) {
            convInList.lastMessage.read = true;
          }
        },
        error: (error) => {
          console.error('Failed to mark conversation as read:', error);
        }
      });
    }

    if (window.innerWidth <= 768) {
      this.sidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeChat() {
    this.currentConversation = null;
    this.showWelcomeState = true;
  }

  onMessageSent(newMessage: MessageDTO) {
    if (this.currentConversation) {
      // Update the current conversation view
      const existingMessages = Array.isArray(this.currentConversation.messages) ? this.currentConversation.messages : [];
      const updatedMessages = [...existingMessages, newMessage];
      this.currentConversation = {
        ...this.currentConversation,
        messages: updatedMessages,
        lastMessage: newMessage,
      };

      // Find and update the conversation in the main list
      const conversationInList = this.allConversations.find(c => c.id === this.currentConversation?.id);
      if (conversationInList) {
        conversationInList.lastMessage = newMessage;
        
        // Move the updated conversation to the top of the list
        this.allConversations = this.allConversations.filter(c => c.id !== conversationInList.id);
        this.allConversations.unshift(conversationInList);
      }
    }
  }
}
