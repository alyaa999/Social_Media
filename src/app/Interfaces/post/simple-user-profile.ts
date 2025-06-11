
export interface SimpleUserProfile {
    userId: string;
    displayName?: string; // Optional, as not all users may have a display name
    userName?: string; // Optional, as not all users may have a username
    profilePictureUrl?: string; // Optional, as not all users may have a profile picture URL
}