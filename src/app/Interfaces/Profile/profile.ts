export interface Profile {
    Id: number;
    UserId: string;
    Email: string;
    FirstName?: string;
    LastName?: string;
    UserName?: string;
    ProfileUrl?: string;
    CoverUrl?: string;
    Address?: string;
    BirthDate: Date;
    MobileNo: string;
    Bio?: string;
    NoFollowers: number;
    NoFollowing: number; 
}
