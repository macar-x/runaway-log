import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadUserData, saveUserData, addHit } from '../storage';
import type { UserData } from '../types';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('loadUserData', () => {
    it('returns null when no data exists', () => {
      const result = loadUserData('testuser');
      expect(result).toBeNull();
    });

    it('returns null when user does not exist', () => {
      const data = {
        otheruser: { username: 'otheruser', hits: [] }
      };
      localStorage.setItem('runawaylog-data', JSON.stringify(data));
      
      const result = loadUserData('testuser');
      expect(result).toBeNull();
    });

    it('loads existing user data', () => {
      const userData: UserData = {
        username: 'testuser',
        hits: [
          { id: '1', timestamp: 1234567890000, date: '2009-02-13' }
        ]
      };
      const data = { testuser: userData };
      localStorage.setItem('runawaylog-data', JSON.stringify(data));
      
      const result = loadUserData('testuser');
      expect(result).toEqual(userData);
    });

    it('handles corrupted data gracefully', () => {
      localStorage.setItem('runawaylog-data', 'invalid json');
      
      const result = loadUserData('testuser');
      expect(result).toBeNull();
    });
  });

  describe('saveUserData', () => {
    it('saves new user data', () => {
      const userData: UserData = {
        username: 'testuser',
        hits: []
      };
      
      saveUserData(userData);
      
      const stored = localStorage.getItem('runawaylog-data');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.testuser).toEqual(userData);
    });

    it('updates existing user data', () => {
      const initialData: UserData = {
        username: 'testuser',
        hits: [{ id: '1', timestamp: 1234567890000, date: '2009-02-13' }]
      };
      saveUserData(initialData);
      
      const updatedData: UserData = {
        username: 'testuser',
        hits: [
          { id: '1', timestamp: 1234567890000, date: '2009-02-13' },
          { id: '2', timestamp: 1234567900000, date: '2009-02-13' }
        ]
      };
      saveUserData(updatedData);
      
      const stored = localStorage.getItem('runawaylog-data');
      const parsed = JSON.parse(stored!);
      expect(parsed.testuser.hits).toHaveLength(2);
    });

    it('preserves other users data', () => {
      const user1: UserData = { username: 'user1', hits: [] };
      const user2: UserData = { username: 'user2', hits: [] };
      
      saveUserData(user1);
      saveUserData(user2);
      
      const stored = localStorage.getItem('runawaylog-data');
      const parsed = JSON.parse(stored!);
      expect(parsed.user1).toEqual(user1);
      expect(parsed.user2).toEqual(user2);
    });
  });

  describe('addHit', () => {
    it('creates new user and adds hit', () => {
      const hit = addHit('testuser');
      
      expect(hit).toBeTruthy();
      expect(hit?.id).toBeTruthy();
      expect(hit?.timestamp).toBeGreaterThan(0);
      expect(hit?.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('adds hit to existing user', () => {
      const userData: UserData = {
        username: 'testuser',
        hits: [{ id: '1', timestamp: 1234567890000, date: '2009-02-13' }]
      };
      saveUserData(userData);
      
      const hit = addHit('testuser');
      
      expect(hit).toBeTruthy();
      
      const loaded = loadUserData('testuser');
      expect(loaded?.hits).toHaveLength(2);
    });

    it('generates unique IDs', () => {
      const hit1 = addHit('testuser');
      const hit2 = addHit('testuser');
      
      expect(hit1?.id).not.toEqual(hit2?.id);
    });

    it('stores current timestamp', () => {
      const before = Date.now();
      const hit = addHit('testuser');
      const after = Date.now();
      
      expect(hit?.timestamp).toBeGreaterThanOrEqual(before);
      expect(hit?.timestamp).toBeLessThanOrEqual(after);
    });
  });
});
