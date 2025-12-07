import { UserRole, UserStatus } from '../../mock/types';

export interface IUser {
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
  passwordHash?: string;
}
