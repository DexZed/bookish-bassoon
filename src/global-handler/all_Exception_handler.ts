import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { HttpException } from './httpexception';

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let httpStatus = 500;
  let message: string | {} = 'Internal server error';

  // HTTP-like errors (custom error classes or custom thrown errors)
 
if (err instanceof HttpException) {
  httpStatus = err.status;
  message = err.message;
}
  // Mongoose Validation Error
  else if (err instanceof MongooseError.ValidationError) {
    httpStatus = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }

  // Mongoose Cast Error (e.g., invalid ObjectId)
  else if (err instanceof MongooseError.CastError) {
    httpStatus = 400;
    message = `Invalid value for ${err.path}: ${err.value}`;
  }

  // MongoServerError: Duplicate key
  else if (err.code === 11000 && err.keyValue) {
    httpStatus = 409;
    const duplicatedField = Object.keys(err.keyValue).join(', ');
    message = `Duplicate key error: ${duplicatedField}`;
  }

  res.status(httpStatus).json({
    statusCode: httpStatus,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    message,
  });
}
