import { Request, Response, NextFunction } from 'express';

export function roleMiddleware(role: 'admin') {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ success: false, code: 'FORBIDDEN', message: 'Forbidden' });
    }
    next();
  };
}
