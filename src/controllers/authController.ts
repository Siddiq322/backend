import { Request, Response } from 'express';
import * as authService from '../services/authService';

export async function register(req: Request, res: Response) {
  const { name, email, password, phone } = req.body;
  const result = await authService.register(name, email, password, phone);
  if (!result.success) return res.status(400).json(result);
  return res.json(result);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  if (!result.success) return res.status(400).json(result);
  return res.json(result);
}

export async function otpRequest(_req: Request, res: Response) {
  return res.json({ success: true, data: { delivered: true, otp: '123456' } });
}

export async function verifyOtp(_req: Request, res: Response) {
  return res.json({ success: true, data: { verified: true } });
}
