import type { NextFunction, Request, Response } from "express";

import { Error as MongooseError } from "mongoose";

import { HttpException } from "./httpexception";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  let httpStatus = 500;
  let message: string | {} = "Internal server error";

  if (err instanceof HttpException) {
    httpStatus = err.status;
    message = err.message;
  }
  else if (err instanceof MongooseError.ValidationError) {
    httpStatus = 400;
    message = Object.values(err.errors)
      .map(e => e.message)
      .join(", ");
  }
  else if (err instanceof MongooseError.CastError) {
    httpStatus = 400;
    message = `Invalid value for ${err.path}: ${err.value}`;
  }
  else if (typeof err.code === "number" && err.code === 11000 && err.keyValue) {
    httpStatus = 409;
    const duplicatedField = Object.keys(err.keyValue).join(", ");
    message = `Duplicate key error: ${duplicatedField}`;
  }

  res.status(httpStatus).json({
    statusCode: httpStatus,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    message,
  });
}
