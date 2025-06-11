export interface EditConversationDTO {
    id: string;
    participants: string[];
    isGroup: boolean;
    userId?: string;
    groupName?: string;
    groupImage?: File; // Equivalent of IFormFile
  }
  