import type { UserData, HitLog } from './types';

const STORAGE_KEY = 'runawaylog-data';

export const loadUserData = (username: string): UserData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    const allUsers: Record<string, UserData> = JSON.parse(data);
    return allUsers[username] || null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

export const saveUserData = (userData: UserData): void => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const allUsers: Record<string, UserData> = data ? JSON.parse(data) : {};
    
    allUsers[userData.username] = userData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allUsers));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const addHit = (username: string): HitLog | null => {
  try {
    const userData = loadUserData(username) || { username, hits: [] };
    
    const newHit: HitLog = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    
    userData.hits.push(newHit);
    saveUserData(userData);
    
    return newHit;
  } catch (error) {
    console.error('Error adding hit:', error);
    return null;
  }
};
