import type { UserData } from './types';

export const exportUserData = (userData: UserData): void => {
  const dataStr = JSON.stringify(userData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `runawaylog-${userData.username}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importUserData = (file: File): Promise<UserData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const userData = JSON.parse(content) as UserData;
        
        // Validate the data structure
        if (!userData.username || !Array.isArray(userData.hits)) {
          reject(new Error('Invalid data format'));
          return;
        }
        
        // Validate each hit has required fields
        for (const hit of userData.hits) {
          if (!hit.id || !hit.timestamp || !hit.date) {
            reject(new Error('Invalid hit data format'));
            return;
          }
        }
        
        resolve(userData);
      } catch (error) {
        reject(new Error('Failed to parse JSON file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};
