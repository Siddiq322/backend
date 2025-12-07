import { Request, Response } from 'express';
import { getMockData, resetMockData } from '../mock/mockData';
import { listAccounts } from '../services/mock/accountService';

export function listUsers(req: Request, res: Response) {
  const { page = '1', limit = '20', role, status } = req.query as Record<string, string>;
  let users = getMockData().users;
  if (role) users = users.filter(u => u.role === role);
  if (status) users = users.filter(u => u.status === status);
  const p = Number(page); const l = Number(limit);
  const start = (p - 1) * l;
  return res.json({ success: true, data: { data: users.slice(start, start + l), total: users.length } });
}

export function impersonate(req: Request, res: Response) {
  const { userId } = req.params;
  const user = getMockData().users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ success: false, code: 'NOT_FOUND', message: 'User not found' });
  return res.json({ success: true, data: { token: `mock-impersonate-${user.id}`, user } });
}

export function reseed(req: Request, res: Response) {
  const { seedNumber } = req.body;
  const data = resetMockData(seedNumber ? Number(seedNumber) : undefined);
  return res.json({ success: true, data: { seed: data._meta.seed, users: data.users.length } });
}

export function systemHealth(_req: Request, res: Response) {
  const data = getMockData();
  return res.json({ success: true, data: { health: data.systemHealth, lastSeedAt: data._meta.lastModified } });
}

export function monitorTransactions(_req: Request, res: Response) {
  const txns = getMockData().transactions.slice(0, 100);
  return res.json({ success: true, data: txns });
}

export function exportUsers(_req: Request, res: Response) {
  const users = getMockData().users;
  const csv = ['id,name,email,role,status'].concat(users.map(u => `${u.id},${u.name},${u.email},${u.role},${u.status}`)).join('\n');
  return res.json({ success: true, data: { csv } });
}

export function accountsSummary(req: Request, res: Response) {
  const accounts = listAccounts(req.query.userId as string | undefined);
  return res.json({ success: true, data: accounts });
}
