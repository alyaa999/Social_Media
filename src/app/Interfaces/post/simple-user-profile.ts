
export interface SimpleUserProfile {
    userId: string;
    displayName?: string; // Optional, as not all users may have a display name
    userName?: string; // Optional, as not all users may have a username
    profilePictureUrl?: string; // Optional, as not all users may have a profile picture URL
}

// Static data for reactions (likes)
export const STATIC_REACTIONS: SimpleUserProfile[] = [
  {
    userId: '1',
    displayName: 'Alice Johnson',
    userName: 'alicej',
    profilePictureUrl: 'assets/default-avatar.png'
  },
  {
    userId: '2',
    displayName: 'Bob Smith',
    userName: 'bobsmith',
    profilePictureUrl: 'assets/default-avatar.png'
  },
  {
    userId: '3',
    displayName: 'Charlie Brown',
    userName: 'charlieb',
    profilePictureUrl: 'assets/default-avatar.png'
  }
];