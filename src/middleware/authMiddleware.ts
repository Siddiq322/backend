import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { getMockData } from '../mock/mockData';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ success: false, code: 'UNAUTHORIZED', message: 'Missing token' });
  const token = header.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string; role: string };
    const user = getMockData().users.find(u => u.id === payload.sub);
    if (!user) return res.status(401).json({ success: false, code: 'UNAUTHORIZED', message: 'User not found' });
    req.user = { id: user.id, role: user.role };
    next();
  } catch (e) {
    return res.status(401).json({ success: false, code: 'UNAUTHORIZED', message: 'Invalid token' });
  }
}
