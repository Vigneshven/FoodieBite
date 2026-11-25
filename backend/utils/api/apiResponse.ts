import type { Response } from "express";
import { ErrorResponseData, SuccessResponseData } from "../types/type";

export function successResponse<T>(
  res: Response,
  { message, data, statusCode = 200 }: SuccessResponseData<T>,
) {
  return res.status(statusCode).json({
    message,
    ...{ data },
  });
}

export function errorResponse(
  res: Response,
  { message, statusCode = 500 }: ErrorResponseData,
) {
  return res.status(statusCode).json({
    message,
  });
}
