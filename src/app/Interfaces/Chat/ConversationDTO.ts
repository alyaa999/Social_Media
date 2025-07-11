import { SimpleUserProfile } from "../Profile/simple-user-profile";
import { MessageDTO } from "./MessageDTO";

export interface ConversationDTO {
    id: string;
    participants: string[];
    isGroup: boolean;
    adminId: string;
    groupName: string;
    groupImageUrl: string ;
    createdAt: string; // ISO date string
    lastMessage?: MessageDTO;
    receiverProfile?: SimpleUserProfile;
  }