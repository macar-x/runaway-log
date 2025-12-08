import type { UserData, HitLog } from './types';
import { getCurrentTimestamp, timestampToDateString, getSavedTimezone } from './timezone';

const STORAGE_KEY = 'runawaylog-data';

export const loadUserData = (username: string): UserData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    const allUsers: Record<string, UserData> = JSON.parse(data);
    const userData = allUsers[username];
    
    if (!userData) return null;
    
    // Migrate old data: recalculate date field based on timestamp and current timezone
    const timezone = getSavedTimezone();
    let needsSave = false;
    
    const migratedHits = userData.hits.map(hit => {
      const correctDate = timestampToDateString(hit.timestamp, timezone);
      if (hit.date !== correctDate) {
        needsSave = true;
        return { ...hit, date: correctDate };
      }
      return hit;
    });
    
    if (needsSave) {
      const migratedData = { ...userData, hits: migratedHits };
      saveUserData(migratedData);
      return migratedData;
    }
    
    return userData;
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
    const userData = loadUserData(username) || { 
      username, 
      hits: [],
      profile: {
        registrationDate: Date.now(),
      }
    };
    
    // Ensure profile exists with registration date for existing users
    if (!userData.profile) {
      userData.profile = {
        registrationDate: Date.now(),
      };
    }
    
    // Store timestamp in UTC (Date.now() is always UTC)
    const timestamp = getCurrentTimestamp();
    const timezone = getSavedTimezone();
    
    const newHit: HitLog = {
      id: `${timestamp}-${Math.random()}`,
      timestamp: timestamp,
      date: timestampToDateString(timestamp, timezone),
    };
    
    userData.hits.push(newHit);
    saveUserData(userData);
    
    return newHit;
  } catch (error) {
    console.error('Error adding hit:', error);
    return null;
  }
};
