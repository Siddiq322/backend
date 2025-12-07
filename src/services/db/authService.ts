import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../../utils/crypto';
import { JWT_SECRET } from '../../config';
import { UserModel } from '../../models/mongoose/User';
import type { User } from '../../mock/types';
import type { IUserDocument } from '../../models/mongoose/User';

function sanitizeUser(user: IUserDocument | User) {
  const safe = { ...user.toObject?.(), ...user } as Record<string, unknown>;
  delete safe.passwordHash;
  return safe as User;
}

export async function register(name: string, email: string, password: string, phone?: string) {
  const normalizedEmail = email.toLowerCase();
  const existing = await UserModel.findOne({ email: normalizedEmail }).lean();
  if (existing) {
    return { success: false as const, code: 'EMAIL_EXISTS', message: 'Email already registered' };
  }
  const passwordHash = await hashPassword(password);
  const now = new Date();
  const created = await UserModel.create({
    name,
    email: normalizedEmail,
    phone: phone || '',
    role: 'customer',
    status: 'active',
    createdAt: now,
    lastLogin: now,
    kycCompleted: false,
    passwordHash
  });
  const token = jwt.sign({ sub: created.id, role: created.role }, JWT_SECRET, { expiresIn: '1d' });
  return { success: true as const, data: { token, user: sanitizeUser(created) } };
}

export async function login(email: string, password: string) {
  const normalizedEmail = email.toLowerCase();
  const user = await UserModel.findOne({ email: normalizedEmail });
  if (!user) return { success: false as const, code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' };
  if (!(await comparePassword(password, user.passwordHash))) {
    return { success: false as const, code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' };
  }
  user.lastLogin = new Date();
  await user.save();
  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  return { success: true as const, data: { token, user: sanitizeUser(user) } };
}
