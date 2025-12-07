import { v4 as uuid } from 'uuid';
import type { MockDataStore, User, Account, Transaction, Loan, CreditCard, FixedDeposit, RecurringDeposit, Stock, MutualFund, IntradayOrder, Notification, FraudAlert, AuditLog } from './types';

function randomChoice<T>(arr: T[], rng: () => number) { return arr[Math.floor(rng() * arr.length)]; }

// Simple deterministic RNG (mulberry32)
function mulberry32(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function seed({ seedNumber = 12345 }: { seedNumber?: number } = {}): MockDataStore {
  const rng = mulberry32(seedNumber);
  const now = new Date();

  const users: User[] = Array.from({ length: 300 }).map((_, i) => {
    const id = `usr_${i}_${uuid()}`;
    return {
      id,
      name: `User ${i + 1}`,
      email: `user${i + 1}@bank.test`,
      phone: `+1555${String(100000 + i)}`,
      role: i < 5 ? 'admin' : 'customer',
      status: 'active',
      createdAt: now.toISOString(),
      lastLogin: now.toISOString(),
      kycCompleted: rng() > 0.2
    };
  });

  const accounts: Account[] = Array.from({ length: 600 }).map((_, i) => {
    const user = randomChoice(users, rng);
    return {
      accountId: `acc_${i}_${uuid()}`,
      userId: user.id,
      type: rng() > 0.8 ? 'checking' : 'savings',
      balance: Math.floor(rng() * 10000),
      currency: 'USD',
      status: 'active',
      createdAt: now.toISOString(),
      tags: ['primary'],
      accountNumber: `****${Math.floor(1000 + rng() * 9000)}`
    };
  });

  const transactions: Transaction[] = Array.from({ length: 5000 }).map((_, i) => {
    const from = randomChoice(accounts, rng);
    const to = randomChoice(accounts, rng);
    const amount = Math.max(5, Math.floor(rng() * 2000));
    return {
      txnId: `txn_${i}_${uuid()}`,
      fromAccount: from.accountId,
      toAccount: to.accountId,
      amount,
      currency: 'USD',
      type: rng() > 0.5 ? 'debit' : 'credit',
      status: 'success',
      channel: 'online',
      timestamp: new Date(now.getTime() - Math.floor(rng() * 30) * 86400000).toISOString(),
      balanceAfter: Math.max(0, from.balance - amount),
      reference: `REF${i}`
    };
  });

  const loans: Loan[] = [];
  const creditCards: CreditCard[] = [];
  const fixedDeposits: FixedDeposit[] = [];
  const recurringDeposits: RecurringDeposit[] = [];

  const stocks: Stock[] = Array.from({ length: 50 }).map((_, i) => ({
    symbol: `STK${i}`,
    name: `Stock ${i}`,
    exchange: 'NSE',
    sector: 'Tech',
    currentPrice: 100 + rng() * 100,
    previousClose: 100,
    dayHigh: 110,
    dayLow: 90,
    volume: Math.floor(rng() * 1_000_000),
    marketCap: 1_000_000_000,
    priceHistory: []
  }));

  const mutualFunds: MutualFund[] = Array.from({ length: 20 }).map((_, i) => ({
    fundId: `MF${i}`,
    name: `Mutual Fund ${i}`,
    category: 'Equity',
    fundHouse: 'Mock AMC',
    nav: 100 + rng() * 50,
    aum: 1_000_000,
    expenseRatio: 0.5,
    rating: 4,
    riskLevel: 'moderate',
    returns1Y: 8,
    returns3Y: 22,
    returns5Y: 45,
    navHistory: []
  }));

  const intradayOrders: IntradayOrder[] = [];

  const notifications: Notification[] = [];

  const fraudAlerts: FraudAlert[] = [];

  const auditLogs: AuditLog[] = [];

  const systemHealth = [
    {
      serviceName: 'Transaction Processor',
      status: 'healthy',
      uptime: 99.9,
      lastChecked: now.toISOString(),
      metrics: { queueLength: 5, errorRate: 0.1 }
    }
  ];

  return {
    users,
    accounts,
    transactions,
    loans,
    creditCards,
    fixedDeposits,
    recurringDeposits,
    stocks,
    mutualFunds,
    intradayOrders,
    notifications,
    auditLogs,
    fraudAlerts,
    systemHealth,
    _meta: { seed: seedNumber, createdAt: now.toISOString(), lastModified: now.toISOString() }
  };
}

// CLI execution removed for ESM compatibility
