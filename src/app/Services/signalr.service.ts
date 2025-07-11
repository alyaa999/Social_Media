import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection!: signalR.HubConnection;
  private privateMessageSource = new BehaviorSubject<any>(null);
  public privateMessage$ = this.privateMessageSource.asObservable();

  // 👇 Replace with your real API base URL
  private hubUrl = 'https://localhost:5001/chatHub'; // or your deployed URL

  startConnection(token: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.hubUrl}?token=${token}`, {
        accessTokenFactory: () => token,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('✅ SignalR connection started'))
      .catch(err => console.error('❌ SignalR connection error:', err));

    this.hubConnection.on('ReceivePrivateMessage', (message: any) => {
      this.privateMessageSource.next(message);
    });
  }

  sendPrivateMessage(toUserId: string, message: string): void {
    this.hubConnection.invoke('SendPrivateMessage', toUserId, message)
      .catch(err => console.error('❌ Error sending message:', err));
  }

  stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
