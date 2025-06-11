export interface MessagesPageRequestDTO {
    conversationId: string;
    next?: string;        // pagination token
    pageSize: number;
  }
  