// Basic types mirroring frontend shapes
export type UserRole = 'admin' | 'customer';
export type UserStatus = 'active' | 'frozen' | 'closed';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin: string;
  kycCompleted: boolean;
  avatar?: string;
}

export type AccountType = 'savings' | 'checking' | 'loan' | 'card' | 'fd' | 'rd';
export type AccountStatus = 'active' | 'inactive' | 'frozen' | 'closed';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface Account {
  accountId: string;
  userId: string;
  type: AccountType;
  balance: number;
  currency: Currency;
  status: AccountStatus;
  createdAt: string;
  tags: string[];
  accountNumber: string;
  nickname?: string;
}

export type TransactionType = 'credit' | 'debit' | 'transfer' | 'payment' | 'refund' | 'fee';
export type TransactionStatus = 'pending' | 'success' | 'failed' | 'reversed';
export type TransactionChannel = 'online' | 'branch' | 'atm' | 'mobile' | 'api';

export interface Transaction {
  txnId: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: Currency;
  type: TransactionType;
  status: TransactionStatus;
  channel: TransactionChannel;
  merchant?: string;
  remarks?: string;
  timestamp: string;
  balanceAfter: number;
  category?: string;
  reference?: string;
  flagged?: boolean;
}

export type LoanType = 'personal' | 'home' | 'auto' | 'education' | 'business';
export type LoanStatus = 'pending' | 'approved' | 'disbursed' | 'closed' | 'defaulted';

export interface EMISchedule {
  emiNumber: number;
  dueDate: string;
  principal: number;
  interest: number;
  totalAmount: number;
  status: 'paid' | 'due' | 'overdue';
  paidDate?: string;
}

export interface Loan {
  loanId: string;
  userId: string;
  accountId: string;
  type: LoanType;
  principalAmount: number;
  interestRate: number;
  tenure: number;
  emiAmount: number;
  disbursedAmount: number;
  outstandingAmount: number;
  status: LoanStatus;
  startDate: string;
  endDate: string;
  emiSchedule: EMISchedule[];
  collateral?: string;
}

export type CardStatus = 'active' | 'blocked' | 'expired' | 'cancelled';
export type CardType = 'platinum' | 'gold' | 'silver' | 'basic';

export interface CreditCard {
  cardId: string;
  userId: string;
  accountId: string;
  cardNumber: string;
  cardType: CardType;
  creditLimit: number;
  availableLimit: number;
  currentBalance: number;
  status: CardStatus;
  expiryDate: string;
  billingCycle: number;
  rewardsPoints: number;
}

export type DepositStatus = 'active' | 'matured' | 'premature_closed' | 'renewed';

export interface FixedDeposit {
  fdId: string;
  userId: string;
  accountId: string;
  principalAmount: number;
  interestRate: number;
  tenure: number;
  startDate: string;
  maturityDate: string;
  maturityAmount: number;
  status: DepositStatus;
  autoRenew: boolean;
}

export interface RecurringDeposit {
  rdId: string;
  userId: string;
  accountId: string;
  monthlyAmount: number;
  interestRate: number;
  tenure: number;
  startDate: string;
  maturityDate: string;
  maturityAmount: number;
  status: DepositStatus;
  totalDeposited: number;
  installmentsPaid: number;
  nextInstallmentDate: string;
}

export interface Stock {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  currentPrice: number;
  previousClose: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  marketCap: number;
  priceHistory: { date: string; price: number }[];
}

export interface IntradayOrder {
  orderId: string;
  userId: string;
  symbol: string;
  orderType: 'market' | 'limit' | 'stop_loss' | 'stop_limit';
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  triggerPrice?: number;
  filledQty: number;
  avgPrice: number;
  status: 'pending' | 'partial' | 'filled' | 'cancelled' | 'rejected';
  createdAt: string;
  updatedAt: string;
  validity: 'day' | 'ioc' | 'gtc';
}

export interface MutualFund {
  fundId: string;
  name: string;
  category: string;
  fundHouse: string;
  nav: number;
  aum: number;
  expenseRatio: number;
  rating: number;
  riskLevel: 'low' | 'moderate' | 'high';
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  navHistory: { date: string; nav: number }[];
}

export type NotificationType = 'transaction' | 'security' | 'promotion' | 'alert' | 'system';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Notification {
  notificationId: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export type AuditAction =
  | 'login' | 'logout' | 'login_failed'
  | 'password_change' | 'password_reset'
  | 'profile_update' | 'kyc_update'
  | 'transaction_create' | 'transaction_reverse'
  | 'account_create' | 'account_freeze' | 'account_close'
  | 'user_impersonate' | 'user_freeze' | 'user_delete'
  | 'role_change' | 'settings_change'
  | 'export_data' | 'bulk_action';

export type AuditStatus = 'success' | 'failure' | 'pending';

export interface AuditLog {
  logId: string;
  userId: string;
  actorId?: string;
  action: AuditAction;
  status: AuditStatus;
  ip: string;
  timestamp: string;
  details?: Record<string, unknown>;
  targetUserId?: string;
  resourceId?: string;
  resourceType?: string;
}

export type FraudSeverity = 'low' | 'medium' | 'high' | 'critical';
export type FraudStatus = 'new' | 'reviewing' | 'confirmed' | 'dismissed' | 'escalated';

export interface FraudAlert {
  alertId: string;
  severity: FraudSeverity;
  status: FraudStatus;
  type: string;
  message: string;
  affectedAccounts: string[];
  affectedUserId: string;
  createdAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
  riskScore: number;
  indicators: string[];
}

export interface MockDataStore {
  users: User[];
  accounts: Account[];
  transactions: Transaction[];
  loans: Loan[];
  creditCards: CreditCard[];
  fixedDeposits: FixedDeposit[];
  recurringDeposits: RecurringDeposit[];
  stocks: Stock[];
  mutualFunds: MutualFund[];
  intradayOrders: IntradayOrder[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  fraudAlerts: FraudAlert[];
  systemHealth: {
    serviceName: string;
    status: 'healthy' | 'degraded' | 'down';
    uptime: number;
    lastChecked: string;
    metrics: Record<string, number>;
  }[];
  _meta: {
    seed: number;
    createdAt: string;
    lastModified: string;
  };
}
