import { seed } from './seedGenerator';
import { loadSnapshot, saveSnapshot } from './mockPersistence';
import type { MockDataStore } from './types';

let mockDataStore: MockDataStore = loadSnapshot() || seed();

export function getMockData(): MockDataStore {
  return mockDataStore;
}

export function setMockData(data: MockDataStore) {
  mockDataStore = data;
  saveSnapshot(mockDataStore);
}

export function resetMockData(seedNumber?: number) {
  mockDataStore = seed({ seedNumber });
  saveSnapshot(mockDataStore);
  return mockDataStore;
}
