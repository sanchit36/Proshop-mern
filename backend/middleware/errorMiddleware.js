import AppError from '../utils/appError.js';

export const notFound = (req, res, next) => {
  next(
    new AppError(`Not Found - ${req.originalUrl} with method ${req.method}`),
    404
  );
};

export const errorHandler = (err, req, res, next) => {
  const statusCode =
    !err.statusCode || err.statusCode === 200 ? 500 : err.statusCode;
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
