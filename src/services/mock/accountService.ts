import { v4 as uuid } from 'uuid';
import { getMockData, setMockData } from '../../mock/mockData';
import type { Account } from '../../mock/types';

export function listAccounts(userId?: string, type?: Account['type'], status?: Account['status']) {
  let accounts = getMockData().accounts;
  if (userId) accounts = accounts.filter(a => a.userId === userId);
  if (type) accounts = accounts.filter(a => a.type === type);
  if (status) accounts = accounts.filter(a => a.status === status);
  return accounts;
}

export function createAccount(userId: string, type: Account['type'], initialDeposit: number) {
  const data = getMockData();
  const now = new Date().toISOString();
  const account: Account = {
    accountId: `acc_${uuid()}`,
    userId,
    type,
    balance: Math.max(0, initialDeposit),
    currency: 'USD',
    status: 'active',
    createdAt: now,
    tags: ['primary'],
    accountNumber: `****${Math.floor(1000 + Math.random() * 9000)}`
  };
  data.accounts.push(account);
  setMockData(data);
  return account;
}

export function getAccount(accountId: string) {
  const data = getMockData();
  const account = data.accounts.find(a => a.accountId === accountId);
  if (!account) return null;
  const transactions = data.transactions.filter(t => t.fromAccount === accountId || t.toAccount === accountId).slice(0, 25);
  return { account, transactions };
}
