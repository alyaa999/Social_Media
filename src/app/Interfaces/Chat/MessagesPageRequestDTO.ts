export interface MessagesPageRequestDTO {
    conversationId: string;
    next: string |null;        // pagination token
    pageSize: number;
  }
  