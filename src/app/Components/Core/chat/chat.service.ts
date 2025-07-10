import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ConversationDTO } from '../../../Interfaces/Chat/ConversationDTO';
import { MessageDTO } from '../../../Interfaces/Chat/MessageDTO';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatData: { [key: string]: ConversationDTO & { messages: MessageDTO[] } } = {
    sarah: {
      id: '1',
      participants: ['user1', 'user2'],
      isGroup: false,
      adminId: '',
      groupName: null,
      groupImageUrl: null,
      createdAt: new Date().toISOString(),
      lastMessage: null,
      messages: [
        this.createMessage('1', 'received', 'Hey! How\'s the project coming along?', '2:30 PM', 'S', '1'),
        this.createMessage('2', 'sent', 'Going great! Just finished the wireframes', '2:31 PM', 'Y', '1'),
        this.createMessage('3', 'received', 'Awesome! Can\'t wait to see them', '2:32 PM', 'S', '1'),
        this.createMessage('4', 'received', 'Excited to start our new project! 🚀', '2:34 PM', 'S', '1')
      ]
    },
    mike: {
      id: '2',
      participants: ['user1', 'user3'],
      isGroup: false,
      adminId: '',
      groupName: null,
      groupImageUrl: null,
      createdAt: new Date().toISOString(),
      lastMessage: null,
      messages: [
        this.createMessage('5', 'received', 'The design looks amazing! Can we discuss some changes?', '1:45 PM', 'M', '2'),
        this.createMessage('6', 'sent', 'Sure! What did you have in mind?', '1:46 PM', 'Y', '2')
      ]
    },
    team: {
      id: '3',
      participants: ['user1', 'user4', 'user5', 'user6', 'user7'],
      isGroup: true,
      adminId: 'user4',
      groupName: 'Team Builders',
      groupImageUrl: null,
      createdAt: new Date().toISOString(),
      lastMessage: null,
      messages: [
        this.createMessage('7', 'received', 'Meeting at 3 PM today', '12:30 PM', 'A', '3', 'Alex'),
        this.createMessage('8', 'sent', 'I\'ll be there!', '12:31 PM', 'Y', '3')
      ]
    },
    lisa: {
      id: '4',
      participants: ['user1', 'user8'],
      isGroup: false,
      adminId: '',
      groupName: null,
      groupImageUrl: null,
      createdAt: new Date().toISOString(),
      lastMessage: null,
      messages: [
        this.createMessage('9', 'sent', 'Here\'s the feedback on your latest work', '11:10 AM', 'Y', '4'),
        this.createMessage('10', 'received', 'Thanks for the feedback!', '11:15 AM', 'L', '4')
      ]
    },
    dev: {
      id: '5',
      participants: ['user1', 'user9', 'user10', 'user11'],
      isGroup: true,
      adminId: 'user9',
      groupName: 'Dev Community',
      groupImageUrl: null,
      createdAt: new Date().toISOString(),
      lastMessage: null,
      messages: [
        this.createMessage('11', 'received', 'New coding challenge is live!', '10:20 AM', 'D', '5', 'Community'),
        this.createMessage('12', 'sent', 'Sounds exciting! I\'ll check it out', '10:21 AM', 'Y', '5')
      ]
    }
  };

  private createMessage(id: string, type: 'sent' | 'received', text: string, time: string, avatar: string, conversationId: string, sender?: string): MessageDTO {
    return {
      id,
      conversationId,
      senderId: type === 'sent' ? 'currentUser' : 'otherUser',
      senderProfile: {
        userId: type === 'sent' ? 'currentUser' : 'otherUser',
        userName: sender || (type === 'sent' ? 'You' : 'Other'),
        displayName: sender || (type === 'sent' ? 'You' : 'Other'),
        profilePictureUrl: ''
      },
      content: text,
      hasAttachment: false,
      attachment: null,
      read: true,
    };
  }

  getConversations() {
    return of(Object.values(this.chatData).map(conv => ({
      ...conv,
      lastMessage: conv.messages.length > 0 ? conv.messages[conv.messages.length - 1] : null
    })));
  }

  getMessages(conversationId: string) {
    const conversation = Object.values(this.chatData).find(c => c.id === conversationId);
    return of(conversation ? conversation.messages : []);
  }

  sendMessage(conversationId: string, content: string) {
    const conversation = Object.values(this.chatData).find(c => c.id === conversationId);
    if (conversation) {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessage = this.createMessage(
        Date.now().toString(),
        'sent',
        content,
        time,
        'Y',
        conversationId
      );
      conversation.messages.push(newMessage);
      conversation.lastMessage = newMessage;
      return of(newMessage);
    }
    return of(null);
  }
}