import { Request, Response } from 'express';
import * as accountService from '../services/mock/accountService';

export function list(req: Request, res: Response) {
  const { userId, type, status } = req.query as Record<string, string>;
  const accounts = accountService.listAccounts(userId, type as any, status as any);
  return res.json({ success: true, data: accounts });
}

export function create(req: Request, res: Response) {
  const { userId, type, initialDeposit } = req.body;
  const account = accountService.createAccount(userId, type, Number(initialDeposit || 0));
  return res.status(201).json({ success: true, data: account });
}

export function getOne(req: Request, res: Response) {
  const { accountId } = req.params;
  const result = accountService.getAccount(accountId);
  if (!result) return res.status(404).json({ success: false, code: 'NOT_FOUND', message: 'Account not found' });
  return res.json({ success: true, data: result });
}
