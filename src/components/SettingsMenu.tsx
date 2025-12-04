import { useState, useEffect, useRef } from 'react';
import { colorThemes, getThemeById, applyTheme } from '../themes';
import { getTheme, setTheme, type Theme } from '../darkMode';
import './SettingsMenu.css';

interface SettingsMenuProps {
  onExport: () => void;
  onImport: () => void;
  onPrint: () => void;
}

export const SettingsMenu = ({ onExport, onImport, onPrint }: SettingsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    return localStorage.getItem('calendar-theme') || 'github-green';
  });
  const [darkMode, setDarkMode] = useState<Theme>(() => getTheme());
  const menuRef = useRef<HTMLDivElement>(null);

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
            <div className="theme-options">
              {colorThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`theme-option ${selectedTheme === theme.id ? 'active' : ''}`}
                >
                  <div className="theme-preview">
                    <span style={{ background: theme.colors.intensity1 }} className="theme-color"></span>
                    <span style={{ background: theme.colors.intensity2 }} className="theme-color"></span>
                    <span style={{ background: theme.colors.intensity3 }} className="theme-color"></span>
                    <span style={{ background: theme.colors.intensity4 }} className="theme-color"></span>
                  </div>
                  <span className="theme-name">{theme.name}</span>
                  {selectedTheme === theme.id && <span className="theme-check">✓</span>}
                </button>
              ))}
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
          </div>
        </div>
      )}
    </div>
  );
};
