export interface NewConversationDTO {
    participants: string[];
    isGroup: boolean;
    userId?: string;
    groupName?: string;
    groupImage?: File; // IFormFile maps to File in browser/TypeScript
  }
  