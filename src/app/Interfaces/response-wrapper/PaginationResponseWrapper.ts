export interface PaginationResponseWrapper<T> {
  data: T;
  hasMore: boolean;
  next: string;
  message: string;
  errors: string[];
  success: boolean;
  errorType: string; // Match with your `ErrorType` enum
}
