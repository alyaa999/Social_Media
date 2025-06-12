import { MessageDTO } from "./MessageDTO";

export interface ConversationDTO {
    id: string;
    participants: string[] | null;
    isGroup: boolean;
    adminId: string;
    groupName: string | null;
    groupImageUrl: string | null;
    createdAt: string; // ISO date string
    lastMessage: MessageDTO | null;
  }