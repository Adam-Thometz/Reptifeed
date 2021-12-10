/** ExpressError middleware
 * 
 * Error classes to handle different kinds of errors
 */

class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  };
};

// 400 Bad request error
class BadRequestError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 400);
  };
};

// 401 Unauthorized error
class UnauthorizedError extends ExpressError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  };
};

// 403 Forbidden error
class ForbiddenError extends ExpressError {
  constructor(message = "Forbidden request") {
    super(message, 403);
  };
};

// 404 Forbidden error
class NotFoundError extends ExpressError {
  constructor(message = "Not found!") {
    super(message, 404);
  };
};

module.exports = {
  ExpressError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError
}