import { useState, useEffect, useRef } from 'react';
import { colorThemes, getThemeById, applyTheme } from '../themes';
import { getTheme, setTheme, type Theme } from '../darkMode';
import { getTimezones, getSavedTimezone, saveTimezone, getTimezoneDisplayName } from '../timezone';
import './SettingsMenu.css';

interface SettingsMenuProps {
  onExport: () => void;
  onImport: () => void;
  onPrint: () => void;
  onTimezoneChange?: () => void;
}

export const SettingsMenu = ({ onExport, onImport, onPrint, onTimezoneChange }: SettingsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    return localStorage.getItem('calendar-theme') || 'github-green';
  });
  const [darkMode, setDarkMode] = useState<Theme>(() => getTheme());
  const [selectedTimezone, setSelectedTimezone] = useState<string>(() => getSavedTimezone());
  const menuRef = useRef<HTMLDivElement>(null);
  const timezones = getTimezones();

  useEffect(() => {
    const theme = getThemeById(selectedTheme);
    applyTheme(theme);
  }, [selectedTheme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    localStorage.setItem('calendar-theme', themeId);
  };

  const handleDarkModeToggle = () => {
    const newTheme = darkMode === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setDarkMode(newTheme);
  };

  const handleTimezoneChange = (timezone: string) => {
    setSelectedTimezone(timezone);
    saveTimezone(timezone);
    if (onTimezoneChange) {
      onTimezoneChange();
    }
  };

  const handleMenuAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="settings-menu-container" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="settings-button"
        title="Settings"
        aria-label="Settings menu"
      >
        ⚙️ Settings
      </button>

      {isOpen && (
        <div className="settings-dropdown">
          <div className="settings-section">
            <h3 className="settings-section-title">Appearance</h3>
            <button onClick={handleDarkModeToggle} className="dark-mode-toggle">
              <span className="toggle-icon">{darkMode === 'dark' ? '🌙' : '☀️'}</span>
              <span className="toggle-label">
                {darkMode === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
              <div className={`toggle-switch ${darkMode === 'dark' ? 'active' : ''}`}>
                <div className="toggle-slider"></div>
              </div>
            </button>
          </div>

          <div className="settings-divider"></div>

          <div className="settings-section">
            <h3 className="settings-section-title">Calendar Theme</h3>
            <div className="theme-selector">
              <select 
                value={selectedTheme} 
                onChange={(e) => handleThemeChange(e.target.value)}
                className="theme-select"
              >
                {colorThemes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="settings-divider"></div>

          <div className="settings-section">
            <h3 className="settings-section-title">Timezone</h3>
            <div className="timezone-selector">
              <select 
                value={selectedTimezone} 
                onChange={(e) => handleTimezoneChange(e.target.value)}
                className="timezone-select"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {getTimezoneDisplayName(tz)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="settings-divider"></div>

          <div className="settings-section">
            <h3 className="settings-section-title">Actions</h3>
            <button onClick={() => handleMenuAction(onExport)} className="settings-action-btn">
              <span className="action-icon">📥</span>
              <span>Export Data</span>
            </button>
            <button onClick={() => handleMenuAction(onImport)} className="settings-action-btn">
              <span className="action-icon">📤</span>
              <span>Import Data</span>
            </button>
            <button onClick={() => handleMenuAction(onPrint)} className="settings-action-btn">
              <span className="action-icon">🖨️</span>
              <span>Print Calendar</span>
            </button>
            <button onClick={() => setIsOpen(false)} className="settings-action-btn">
              <span className="action-icon">✖️</span>
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
