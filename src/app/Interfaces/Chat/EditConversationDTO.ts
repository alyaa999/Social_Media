export interface EditConversationDTO {
    id: string;
    participants: string[];
    isGroup: boolean;
    userId: string;
    groupName: string|null;
    groupImage: File|null; // Equivalent of IFormFile
  }
  