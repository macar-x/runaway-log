export type HitLog = {
  id: string;
  timestamp: number;
  date: string;
};

export type GameSettings = {
  forkInTheRoadEnabled?: boolean;
};

export type UserSettings = {
  timezone?: string;
  theme?: string;
  darkMode?: 'light' | 'dark';
  games?: GameSettings;
};

export type UserProfile = {
  email?: string;
  registrationDate: number;
  avatarUrl?: string;
};

export type UserData = {
  username: string;
  hits: HitLog[];
  settings?: UserSettings;
  profile?: UserProfile;
};
