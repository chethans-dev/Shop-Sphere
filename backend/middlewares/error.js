import ErrorHandler from "../utils/errorHandler.js";

export const globalErrorHandler = (err, req, res, next) => {
  console.error("Error::", err.name);

  let statusCode = err.statusCode || 500;
  let message = err.message || "An unexpected error occurred on the server";
  let stack = process.env.NODE_ENV === "production" ? null : err.stack;

  // Wrong mongodb id error
  if (err.name === "CastError") {
    message = `Resource not found. Invalid ${err.path}: ${err.value}`;
    err = new ErrorHandler(message, 400);
    // stack = err.stack;
    // statusCode = err.code;
  }

  // Mongoose duplicate key error
  if(err.code === 11000) {
    message = `Duplicate ${Object.keys(err.keyValue)} entered`
    err = new  ErrorHandler(message, 400);
  }

  // Wrong jwt error or expired jwt
  if(err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    message = "Invalid token"
    err = new ErrorHandler(message, 401);
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack,
  });
};
