export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number; // Token expiration time in seconds
}