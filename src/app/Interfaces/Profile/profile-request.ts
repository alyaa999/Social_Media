export interface ProfileRequest {
    Email?: string;
    FirstName?: string;
    LastName?: string;
    UserName?: string;
    Address?: string;
    BirthDate: Date;
    MobileNo?: string;
    Bio?: string;
    ProfilePic?: File;
    CoverPic?: File;
}
