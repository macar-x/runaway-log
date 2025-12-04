import { useState, useEffect } from 'react';
import { colorThemes, getThemeById, applyTheme, type ColorTheme } from '../themes';
import './ThemeSelector.css';

interface ThemeSelectorProps {
  onThemeChange?: (theme: ColorTheme) => void;
}

export const ThemeSelector = ({ onThemeChange }: ThemeSelectorProps) => {
  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    return localStorage.getItem('calendar-theme') || 'github-green';
  });

  useEffect(() => {
    const theme = getThemeById(selectedTheme);
    applyTheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  }, [selectedTheme, onThemeChange]);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    localStorage.setItem('calendar-theme', themeId);
  };

  return (
    <div className="theme-selector">
      <label htmlFor="theme-select" className="theme-label">
        🎨 Calendar Theme:
      </label>
      <select
        id="theme-select"
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
  );
};
