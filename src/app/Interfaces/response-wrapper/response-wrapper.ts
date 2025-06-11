export interface ResponseWrapper<T> {
  data: T;
  message: string;
  errors: string[];
  success: boolean;
  errorType: ErrorType;
}

export type ErrorType = 'None' | 'NotFound' | 'BadRequest' | 'UnAuthorized' | 'Validation' | 'InternalServerError';
