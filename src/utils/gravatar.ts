import SHA256 from 'crypto-js/sha256';

export const getGravatarUrl = (email: string | undefined, size: number = 200, username: string = 'user'): string => {
  if (!email) {
    // Use DiceBear as default avatar if no email
    // Generate a unique avatar based on username
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}&size=${size}`;
  }

  // Create SHA256 hash of email (Gravatar's current standard)
  // Email must be trimmed and lowercased before hashing
  const hash = SHA256(email.trim().toLowerCase()).toString();
  
  // Return Gravatar URL with DiceBear as fallback
  return `https://gravatar.com/avatar/${hash}?d=https%3A%2F%2Fapi.dicebear.com%2F7.x%2Favataaars%2Fsvg%3Fseed%3D${encodeURIComponent(username)}&s=${size}`;
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
