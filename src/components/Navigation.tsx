import { NavLink } from 'react-router-dom';
import { ModeToggle } from './ModeToggle';
import { SettingsMenu } from './SettingsMenu';
import { useMode } from '../contexts/ModeContext';
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

  return (
    <nav className="pro-navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="nav-logo">🏃</span>
          <span className="nav-title">RunawayLog</span>
        </div>

        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
          {isPro && (
            <>
              <NavLink to="/games" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Games
              </NavLink>
              <NavLink to="/storage" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Storage
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Profile
              </NavLink>
              <NavLink to="/releases" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Releases
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About
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
          <div className="nav-user">
            <span className="nav-user-icon">👤</span>
            <span className="nav-username">{username}</span>
          </div>
          <button onClick={onLogout} className="nav-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
