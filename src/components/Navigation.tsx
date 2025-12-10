import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { SettingsMenu } from './SettingsMenu';
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
          <NavLink to="/games" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {i18n.t('navigation.games')}
          </NavLink>
          <NavLink to="/storage" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {i18n.t('navigation.storage')}
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {i18n.t('navigation.settings')}
          </NavLink>
        </div>

        <div className="nav-actions">
          <NavLink to="/profile" className="nav-user">
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
