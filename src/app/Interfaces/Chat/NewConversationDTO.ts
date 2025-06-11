export interface NewConversationDTO {
    participants: string[];
    isGroup: boolean;
    userId: string |null;
    groupName: string |null;
    groupImage: File |null; // IFormFile maps to File in browser/TypeScript
  }
  