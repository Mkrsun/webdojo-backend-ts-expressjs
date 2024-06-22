import { Request, Response, NextFunction } from "express";
import { CustomError } from "../error";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.errorMessage || "Internal Server Error";

  res.status(statusCode).json({
    error: message,
  });

  // Call next() to ensure Express knows this is an error-handling middleware
  next();
};

export default errorHandler;
