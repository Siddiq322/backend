import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err);
  res.status(500).json({ success: false, code: 'SERVER_ERROR', message: 'Unexpected error' });
}
