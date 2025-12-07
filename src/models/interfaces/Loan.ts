import { LoanStatus, LoanType } from '../../mock/types';

export interface IEMISchedule {
  emiNumber: number;
  dueDate: string;
  principal: number;
  interest: number;
  totalAmount: number;
  status: 'paid' | 'due' | 'overdue';
  paidDate?: string;
}

export interface ILoan {
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
  emiSchedule: IEMISchedule[];
  collateral?: string;
}
