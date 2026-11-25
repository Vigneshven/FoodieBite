// apiresponse

export type SuccessResponseData<T> = {
  message: string;
  data?: T;
  statusCode?: number;
};

export type ErrorResponseData = {
  message: string;
  statusCode?: number;
};

export interface EmailError extends Error {
  code?: string;
  responseCode?: number;
  response?: string;
}
