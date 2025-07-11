import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../../../../Services/chat.service';
import { NewMessageDTO } from '../../../../Interfaces/Chat/NewMessageDTO';
import { FormsModule } from '@angular/forms';
import { MessageDTO } from '../../../../Interfaces/Chat/MessageDTO';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
  imports: [FormsModule] // Add FormsModule to imports
})
export class MessageInputComponent {
  @Input() conversationId: string = '';
  @Output() messageSent = new EventEmitter<MessageDTO>();
  message: string = '';

  constructor(private chatService: ChatService) {}

  sendMessage() {
    console.log('Send button clicked!'); // First debug point
    if (this.message.trim() && this.conversationId) {
      console.log('Message and conversation ID present'); // Second debug point
      
      const newMessageDTO: NewMessageDTO = {
        content: this.message,
        conversationId: this.conversationId,
        senderId: "temp-user-id", // Temporary hardcoded ID for testing
        media: null,
        mediaType: null
      };
      
      console.log('Attempting to send:', newMessageDTO); // Third debug point
      
      this.chatService.sendMessage(newMessageDTO).subscribe({
        next: (response) => {
          console.log('Message sent successfully:', response);
          this.messageSent.emit(response);
          this.message = '';
        },
        error: (error) => {
          console.error('Error sending message:', error);
        },
        complete: () => {
          console.log('Send operation completed');
        }
      });
    } else {
      console.warn('Cannot send - missing message or conversation ID');
      console.log('Message:', this.message);
      console.log('Conversation ID:', this.conversationId);
    }
  }
}
