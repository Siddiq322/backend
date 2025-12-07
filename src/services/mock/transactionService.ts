import { v4 as uuid } from 'uuid';
import { getMockData, setMockData } from '../../mock/mockData';
import { mockEventEmitter } from '../../mock/eventEmitter';
import type { Transaction } from '../../mock/types';

export function transferAtomic(fromAccountId: string, toAccountId: string, amount: number, metadata?: Record<string, unknown>) {
  const data = getMockData();
  const from = data.accounts.find(a => a.accountId === fromAccountId);
  const to = data.accounts.find(a => a.accountId === toAccountId);
  if (!from || !to) return { success: false as const, code: 'NOT_FOUND', message: 'Account not found' };
  if (from.balance < amount) return { success: false as const, code: 'INSUFFICIENT_FUNDS', message: 'Insufficient funds' };

  const snapshotFrom = { ...from };
  const snapshotTo = { ...to };
  const txn: Transaction = {
    txnId: `txn_${uuid()}`,
    fromAccount: fromAccountId,
    toAccount: toAccountId,
    amount,
    currency: from.currency,
    type: 'transfer',
    status: 'pending',
    channel: 'online',
    remarks: metadata?.remarks as string | undefined,
    timestamp: new Date().toISOString(),
    balanceAfter: from.balance - amount,
    reference: `REF${Date.now()}`
  };
  data.transactions.unshift(txn);

  try {
    from.balance -= amount;
    to.balance += amount;
    txn.status = 'success';
    setMockData(data);
    mockEventEmitter.emit('transaction.created', txn);
    mockEventEmitter.emit('account.balance.updated', { accountId: from.accountId, balance: from.balance });
    mockEventEmitter.emit('account.balance.updated', { accountId: to.accountId, balance: to.balance });
    return { success: true as const, data: txn };
  } catch (e) {
    Object.assign(from, snapshotFrom);
    Object.assign(to, snapshotTo);
    txn.status = 'failed';
    setMockData(data);
    return { success: false as const, code: 'SERVER_ERROR', message: 'Transfer failed' };
  }
}

export function listTransactions(accountId?: string, page = 1, limit = 20) {
  const data = getMockData();
  let txns = data.transactions;
  if (accountId) txns = txns.filter(t => t.fromAccount === accountId || t.toAccount === accountId);
  const start = (page - 1) * limit;
  return { data: txns.slice(start, start + limit), total: txns.length };
}
