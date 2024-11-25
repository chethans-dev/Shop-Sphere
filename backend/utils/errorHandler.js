class ErrorHandler extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    if (process.env.NODE_ENV === "development")
      Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
