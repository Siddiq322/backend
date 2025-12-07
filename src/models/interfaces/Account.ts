import { AccountStatus, AccountType, Currency } from '../../mock/types';

export interface IAccount {
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
