import { IS_MOCK } from '../config';
import * as mockAuth from './mock/authService';
import * as dbAuth from './db/authService';

export async function register(name: string, email: string, password: string, phone?: string) {
  return IS_MOCK ? mockAuth.register(name, email, password, phone) : dbAuth.register(name, email, password, phone);
}

export async function login(email: string, password: string) {
  return IS_MOCK ? mockAuth.login(email, password) : dbAuth.login(email, password);
}
