import { Currency, TransactionChannel, TransactionStatus, TransactionType } from '../../mock/types';

export interface ITransaction {
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
