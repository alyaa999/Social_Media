export interface ProfileAggregation {
  userId: string;
  displayName?: string;
  userName?: string;
  profilePictureUrl?: string;
  isFollowing: boolean;
  isFollower: boolean;
}