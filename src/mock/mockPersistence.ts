import fs from 'fs';
import path from 'path';
import type { MockDataStore } from './types';

const SNAPSHOT_PATH = path.join(process.cwd(), 'src', 'mock', 'snapshot.json');

export function saveSnapshot(data: MockDataStore) {
  fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export function loadSnapshot(): MockDataStore | null {
  if (!fs.existsSync(SNAPSHOT_PATH)) return null;
  const raw = fs.readFileSync(SNAPSHOT_PATH, 'utf-8');
  return JSON.parse(raw) as MockDataStore;
}
