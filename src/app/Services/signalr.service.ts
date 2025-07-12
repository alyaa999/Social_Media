import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageDTO } from '../Interfaces/Chat/MessageDTO';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  // Start the connection with userId as query param
  public startConnection(userId: string): void {
    const hubUrl = `http://localhost:7094/chathub?userId=${userId}`;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log("Connected to SignalR hub"))
      .catch(err => console.error("Connection error: ", err));
  }

  // Listener for receiving private messages
  public addReceivePrivateMessageListener(callback: (message: MessageDTO) => void): void {
    this.hubConnection.on("ReceivePrivateMessage", callback);
  }

  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop()
        .then(() => console.log("Disconnected from SignalR hub"))
        .catch(err => console.error("Disconnection error: ", err));
    }
  }
}
