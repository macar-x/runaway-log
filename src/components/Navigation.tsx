import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ModeToggle } from './ModeToggle';
import { SettingsMenu } from './SettingsMenu';
import { useMode } from '../contexts/ModeContext';
import { i18n } from '../i18n/i18n';
import './Navigation.css';

interface NavigationProps {
  username: string;
  onLogout: () => void;
  onExport: () => void;
  onImport: () => void;
  onPrint: () => void;
  onTimezoneChange: () => void;
}

export const Navigation = ({ username, onLogout, onExport, onImport, onPrint, onTimezoneChange }: NavigationProps) => {
  const { mode } = useMode();
  const isPro = mode === 'pro';
  
  // Force re-render when language changes
  const [, setLanguageChangeTrigger] = useState(0);
  
  useEffect(() => {
    const unsubscribe = i18n.onLanguageChange(() => {
      setLanguageChangeTrigger(prev => prev + 1);
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <nav className="pro-navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="nav-logo">🏃</span>
          <span className="nav-title">{i18n.t('dashboard.brand_title')}</span>
        </div>

        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            {i18n.t('navigation.home')}
          </NavLink>
          {isPro && (
            <>
              <NavLink to="/games" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {i18n.t('navigation.games')}
              </NavLink>
              <NavLink to="/storage" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {i18n.t('navigation.storage')}
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {i18n.t('navigation.about')}
              </NavLink>
            </>
          )}
        </div>

        <div className="nav-actions">
          <ModeToggle />
          <SettingsMenu
            onExport={onExport}
            onImport={onImport}
            onPrint={onPrint}
            onTimezoneChange={onTimezoneChange}
          />
          <NavLink to="/profile" className="nav-user nav-link">
            <span className="nav-user-icon">👤</span>
            <span className="nav-username">{username}</span>
          </NavLink>
          <button onClick={onLogout} className="nav-logout">
            {i18n.t('dashboard.logout')}
          </button>
        </div>
      </div>
    </nav>
  );
};
