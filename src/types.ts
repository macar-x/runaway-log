export type HitLog = {
  id: string;
  timestamp: number;
  date: string;
};

export type UserData = {
  username: string;
  hits: HitLog[];
};
