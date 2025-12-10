import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { i18n } from '../i18n/i18n';
import './Navigation.css';

type NavigationProps = {
  username: string;
  onLogout: () => void;
};

export const Navigation = ({ username, onLogout }: NavigationProps) => {
  // Force re-render when language changes
  const [, setLanguageChangeTrigger] = useState(0);
  // User menu state
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  useEffect(() => {
    const unsubscribe = i18n.onLanguageChange(() => {
      setLanguageChangeTrigger(prev => prev + 1);
    });
    
    return () => unsubscribe();
  }, []);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

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
          
          <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {i18n.t('navigation.settings')}
          </NavLink>
        </div>

        <div className="nav-actions">
          <div className="user-menu-container">
            <button 
              className="nav-user" 
              onClick={toggleUserMenu}
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
            >
              <span className="nav-user-icon">👤</span>
              <span className="nav-username">{username}</span>
              <span className="nav-user-arrow">{userMenuOpen ? '▼' : '▲'}</span>
            </button>
            
            {userMenuOpen && (
              <div className="user-menu">
                <NavLink 
                  to="/profile" 
                  className="user-menu-item"
                  onClick={closeUserMenu}
                >
                  <span className="user-menu-icon">👤</span>
                  <span className="user-menu-text">个人资料</span>
                </NavLink>
                <NavLink 
                  to="/settings" 
                  className="user-menu-item"
                  onClick={closeUserMenu}
                >
                  <span className="user-menu-icon">ℹ️</span>
                  <span className="user-menu-text">关于我们</span>
                </NavLink>
                <button 
                  className="user-menu-item user-menu-item-logout"
                  onClick={() => {
                    closeUserMenu();
                    onLogout();
                  }}
                >
                  <span className="user-menu-icon">🚪</span>
                  <span className="user-menu-text">退出登录</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
