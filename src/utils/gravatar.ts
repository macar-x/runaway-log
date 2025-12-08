import SHA256 from 'crypto-js/sha256';

export const getGravatarUrl = (email: string | undefined, size: number = 200): string => {
  if (!email) {
    // Default avatar if no email
    return `https://gravatar.com/avatar/0000000000000000000000000000000000000000000000000000000000000000?d=mp&s=${size}`;
  }

  // Create SHA256 hash of email (Gravatar's current standard)
  // Email must be trimmed and lowercased before hashing
  const hash = SHA256(email.trim().toLowerCase()).toString();
  
  // Return Gravatar URL with mystery person as default
  return `https://gravatar.com/avatar/${hash}?d=mp&s=${size}`;
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
