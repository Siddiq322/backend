import { Request, Response } from 'express';
import * as txnService from '../services/mock/transactionService';

export function transfer(req: Request, res: Response) {
  const { fromAccount, toAccount, amount, metadata } = req.body;
  const result = txnService.transferAtomic(fromAccount, toAccount, Number(amount), metadata);
  if (!result.success) return res.status(400).json(result);
  return res.json(result);
}

export function history(req: Request, res: Response) {
  const { accountId, page = '1', limit = '20' } = req.query as Record<string, string>;
  const result = txnService.listTransactions(accountId, Number(page), Number(limit));
  return res.json({ success: true, data: result });
}
