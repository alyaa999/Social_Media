export interface FollowListRequest {
  userId?: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  [key: string]: any; // if you have additional filters
}
