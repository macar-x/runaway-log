import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { loadUserData } from '../storage';
import { exportUserData, importUserData } from '../exportImport';

interface LayoutProps {
  username: string;
  onLogout: () => void;
  children: ReactNode;
}

export const Layout = ({ username, onLogout, children }: LayoutProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setRefreshKey] = useState(0);

  const handleExport = () => {
    const userData = loadUserData(username);
    if (userData) {
      exportUserData(userData);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importUserData(file);
      setRefreshKey(prev => prev + 1);
      window.location.reload();
    } catch (error) {
      alert(`❌ Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    if (event.target) {
      event.target.value = '';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTimezoneChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportFile}
        style={{ display: 'none' }}
      />
      <Navigation
        username={username}
        onLogout={onLogout}
        onExport={handleExport}
        onImport={handleImportClick}
        onPrint={handlePrint}
        onTimezoneChange={handleTimezoneChange}
      />
      {children}
    </>
  );
};
