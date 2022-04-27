function errorHandler(err: any, req: any, res: any, next: any) {
  const statusCode = res.statusCode ? res.statusCode : 400;

  res.statusCode(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });

  next();
}

export default {
  errorHandler,
};
