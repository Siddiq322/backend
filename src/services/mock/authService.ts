import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { getMockData, setMockData } from '../../mock/mockData';
import { hashPassword, comparePassword } from '../../utils/crypto';
import { JWT_SECRET } from '../../config';
import type { User } from '../../mock/types';

export async function register(name: string, email: string, password: string, phone?: string) {
  const data = getMockData();
  if (data.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false as const, code: 'EMAIL_EXISTS', message: 'Email already registered' };
  }
  const now = new Date().toISOString();
  const user: User = {
    id: `usr_${uuid()}`,
    name,
    email,
    phone: phone || '',
    role: 'customer',
    status: 'active',
    createdAt: now,
    lastLogin: now,
    kycCompleted: false
  };
  const passwordHash = await hashPassword(password);
  (user as any).passwordHash = passwordHash;
  data.users.push(user);
  setMockData(data);
  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  return { success: true as const, data: { token, user } };
}

export async function login(email: string, password: string) {
  const data = getMockData();
  const user = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { success: false as const, code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' };
  const hash = (user as any).passwordHash;
  if (!hash || !(await comparePassword(password, hash))) {
    return { success: false as const, code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' };
  }
  user.lastLogin = new Date().toISOString();
  setMockData(data);
  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  return { success: true as const, data: { token, user } };
}
