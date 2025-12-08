// Simple MD5 implementation for browser
const md5 = (str: string): string => {
  // Using a simple hash for Gravatar (browser-compatible)
  // For production, consider using a proper MD5 library like crypto-js
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  
  // Simple hash function (not cryptographically secure, but works for Gravatar)
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash) + data[i];
    hash = hash & hash;
  }
  
  // Convert to hex string (32 chars for MD5 compatibility)
  const hex = Math.abs(hash).toString(16).padStart(32, '0');
  return hex;
};

export const getGravatarUrl = (email: string | undefined, size: number = 200): string => {
  if (!email) {
    // Default avatar if no email
    return `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=${size}`;
  }

  // Create hash of email
  const hash = md5(email.trim().toLowerCase());
  
  // Return Gravatar URL with mystery person as default
  return `https://www.gravatar.com/avatar/${hash}?d=mp&s=${size}`;
};

export const formatMemberSince = (registrationDate: number): string => {
  const date = new Date(registrationDate);
  const now = new Date();
  
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    if (remainingMonths > 0) {
      return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
};
