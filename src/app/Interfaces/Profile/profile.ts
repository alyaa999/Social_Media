export interface Profile {
    id: number;
    userId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    profileUrl?: string;
    coverUrl?: string;
    address?: string;
    birthDate: Date;
    mobileNo: string;
    bio?: string;
    noFollowers: number;
    noFollowing: number;
}
