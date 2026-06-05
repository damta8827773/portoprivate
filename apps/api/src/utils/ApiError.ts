/** Operational error with an HTTP status — thrown by services/controllers. */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;
  public readonly isOperational = true;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  static badRequest(message = 'Bad request', details?: unknown) {
    return new ApiError(400, message, details);
  }

  static tooMany(message = 'Too many requests') {
    return new ApiError(429, message);
  }
}
