export type AppMode = 'free' | 'pro';

export interface ModeContextType {
  mode: AppMode;
  toggleMode: () => void;
  setMode: (mode: AppMode) => void;
}
