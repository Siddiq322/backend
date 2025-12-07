import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse({ body: req.body, query: req.query, params: req.params });
    if (!parsed.success) {
      return res.status(400).json({ success: false, code: 'INVALID_INPUT', message: 'Validation failed', details: parsed.error.flatten() });
    }
    req.body = parsed.data.body;
    req.query = parsed.data.query as any;
    req.params = parsed.data.params as any;
    next();
  };
}
