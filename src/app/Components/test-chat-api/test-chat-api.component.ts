import { Component } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { NewMessageDTO } from '../../Interfaces/Chat/NewMessageDTO';
import { MessageDTO } from '../../Interfaces/Chat/MessageDTO';
import { NewConversationDTO } from '../../Interfaces/Chat/NewConversationDTO';
import { ConversationDTO } from '../../Interfaces/Chat/ConversationDTO';
import { EditConversationDTO } from '../../Interfaces/Chat/EditConversationDTO';


@Component({
  selector: 'app-test-chat-api',
  templateUrl: './test-chat-api.component.html'
})
export class TestChatApiComponent {
  result: any;
  error: string = '';

  constructor(private chatService: ChatService) {}

  sendMessageTest() {
    const newMessage: NewMessageDTO = {
      conversationId: 'mock-convo-id',
      senderId: '',
      content: 'Mock test message',
      media: null,
      mediaType: null
    };

    this.chatService.sendMessage('mock-user-id', newMessage).subscribe({
      next: res => this.result = res,
      error: err => this.error = err.message
    });
  }

  editMessageTest() {
    const editedMessage: MessageDTO = {
      id: 'mock-message-id',
      conversationId: 'mock-convo-id',
      senderId: '',
      content: 'Edited content',
      senderProfile: { userId: 'mock', userName: 'test', displayName: 'Tester', profilePictureUrl: '' },
      hasAttachment: false,
      attachment: null,
      read: false
    };

    this.chatService.editMessage(editedMessage).subscribe({
      next: res => this.result = res,
      error: err => this.error = err.message
    });
  }

  deleteMessageTest() {
    this.chatService.deleteMessage('mock-user-id', 'mock-message-id').subscribe({
      next: () => this.result = 'Message deleted.',
      error: err => this.error = err.message
    });
  }

  createConversationTest() {
    const newConv: NewConversationDTO = {
      participants: ['user1', 'user2'],
      isGroup: true,
      groupName: 'Mock Group',
      groupImage: null,
      userId: 'mock-user-id'
    };

    this.chatService.createConversation(newConv).subscribe({
      next: (res: ConversationDTO) => this.result = res,
      error: err => this.error = err.message
    });
  }

  editConversationTest() {
    const editConv: EditConversationDTO = {
      id: 'mock-convo-id',
      participants: ['user1', 'user3'],
      isGroup: true,
      groupName: 'Updated Group',
      groupImage: null,
      userId: 'mock-user-id'
    };

    this.chatService.editConversation(editConv).subscribe({
      next: res => this.result = res,
      error: err => this.error = err.message
    });
  }

  deleteConversationTest() {
    this.chatService.deleteConversation('mock-user-id').subscribe({
      next: () => this.result = 'Conversation deleted.',
      error: err => this.error = err.message
    });
  }

  markReadTest() {
    this.chatService.markRead({ conversationId: 'mock-convo-id' }).subscribe({
      next: () => this.result = 'Messages marked as read.',
      error: err => this.error = err.message
    });
  }
}
