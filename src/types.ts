export type HitLog = {
  id: string;
  timestamp: number;
  date: string;
};

export type UserSettings = {
  timezone?: string;
  theme?: string;
  darkMode?: 'light' | 'dark';
};

export type UserData = {
  username: string;
  hits: HitLog[];
  settings?: UserSettings;
};
