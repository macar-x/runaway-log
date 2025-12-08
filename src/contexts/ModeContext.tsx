import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppMode, ModeContextType } from '../types/mode';

const ModeContext = createContext<ModeContextType | undefined>(undefined);

const MODE_STORAGE_KEY = 'runawaylog-app-mode';

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<AppMode>(() => {
    const saved = localStorage.getItem(MODE_STORAGE_KEY);
    return (saved === 'pro' ? 'pro' : 'free') as AppMode;
  });

  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
    localStorage.setItem(MODE_STORAGE_KEY, newMode);
  };

  const toggleMode = () => {
    const newMode = mode === 'free' ? 'pro' : 'free';
    setMode(newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
