import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
  statusCode?: number;
  code?: string;
}

function errorHandler(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // If we have an error object with either `status` or `statusCode` property, use that.
  let statusCode = 500;
  if (err?.status) statusCode = err.status;
  if (!err?.status && err.statusCode) statusCode = err.statusCode;

  res
    .status(statusCode)
    .json({ message: err?.message ?? 'Internal server error...' });
}

export default errorHandler;
