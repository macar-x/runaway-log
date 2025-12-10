import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { colorThemes, getThemeById, applyTheme } from '../themes';
import { getTheme, setTheme, type Theme } from '../darkMode';
import { getTimezones, getSavedTimezone, saveTimezone, getTimezoneDisplayName } from '../timezone';
import { i18n } from '../i18n/i18n';
import type { SupportedLanguage } from '../i18n/i18n';
import './Settings.css';

export const Settings = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('runawaylog-username') || '';
  
  const handleLogout = () => {
    sessionStorage.removeItem('runawaylog-username');
    navigate('/');
    window.location.reload();
  };
  
  // Theme settings
  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    return localStorage.getItem('calendar-theme') || 'github-green';
  });
  
  // Dark mode settings
  const [darkMode, setDarkMode] = useState<Theme>(() => getTheme());
  
  // Timezone settings
  const [selectedTimezone, setSelectedTimezone] = useState<string>(() => getSavedTimezone());
  const timezones = getTimezones();
  
  // Language settings
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(() => i18n.getLanguage());
  
  // Force re-render when language changes
  const [, setLanguageChangeTrigger] = useState(0);
  
  useEffect(() => {
    const unsubscribe = i18n.onLanguageChange(() => {
      setLanguageChangeTrigger(prev => prev + 1);
    });
    
    return () => unsubscribe();
  }, []);
  
  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    localStorage.setItem('calendar-theme', themeId);
    const theme = getThemeById(themeId);
    applyTheme(theme);
  };
  
  const handleDarkModeToggle = () => {
    const newMode = darkMode === 'light' ? 'dark' : 'light';
    setDarkMode(newMode);
    setTheme(newMode);
  };
  
  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimezone = e.target.value;
    setSelectedTimezone(newTimezone);
    saveTimezone(newTimezone);
    // Refresh page to apply timezone changes
    window.location.reload();
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as SupportedLanguage;
    setSelectedLanguage(newLanguage);
    i18n.setLanguage(newLanguage);
  };
  
  // Import/export and print functions have been moved to Storage page
  
  return (
    <Layout username={username} onLogout={handleLogout}>
      <div className="settings-page">
        <div className="settings-container">
          <h1 className="settings-title">{i18n.t('settings.title')}</h1>
          
          <div className="settings-grid">
            {/* Appearance Settings */}
            <div className="settings-card">
              <h2 className="settings-card-title">{i18n.t('settings.appearance_settings')}</h2>
              
              {/* Dark Mode */}
              <div className="setting-item">
                <div className="setting-label">{i18n.t('settings.dark_mode')}</div>
                <div className="dark-mode-toggle-container">
                  <label className="dark-mode-toggle-label">
                    <input
                      type="checkbox"
                      checked={darkMode === 'dark'}
                      onChange={handleDarkModeToggle}
                      className="dark-mode-toggle-checkbox"
                    />
                    <span className="dark-mode-toggle-slider"></span>
                  </label>
                  <span className="dark-mode-text">
                    {darkMode === 'dark' ? i18n.t('settings.dark') : i18n.t('settings.light')}
                  </span>
                </div>
              </div>
              
              {/* Theme */}
              <div className="setting-item">
                <div className="setting-label">{i18n.t('settings.theme')}</div>
                <div className="theme-grid">
                  {colorThemes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`theme-option ${selectedTheme === theme.id ? 'active' : ''}`}
                      onClick={() => handleThemeChange(theme.id)}
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.colors.intensity2} 0%, ${theme.colors.intensity4} 100%)` 
                      }}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Regional Settings */}
            <div className="settings-card">
              <h2 className="settings-card-title">{i18n.t('settings.regional_settings')}</h2>
              
              {/* Timezone */}
              <div className="setting-item">
                <div className="setting-label">{i18n.t('settings.timezone')}</div>
                <select
                  value={selectedTimezone}
                  onChange={handleTimezoneChange}
                  className="settings-select"
                >
                  {timezones.map((timezone) => (
                    <option key={timezone}
                      value={timezone}>
                      {getTimezoneDisplayName(timezone)}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Language */}
              <div className="setting-item">
                <div className="setting-label">{i18n.t('settings.language')}</div>
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className="settings-select"
                >
                  {i18n.getSupportedLanguages().map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* About */}
            <div className="settings-card">
              <h2 className="settings-card-title">{i18n.t('settings.about')}</h2>
              <div className="about-content">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏃</div>
                <h3 style={{ marginBottom: '1rem' }}>{i18n.t('dashboard.brand_title')}</h3>
                <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                  {i18n.t('settings.about_description')}
                </p>
                <div style={{ 
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1rem',
                  marginTop: '1rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-tertiary)'
                }}>
                  <p dangerouslySetInnerHTML={{ __html: i18n.t('settings.built_with') }}></p>
                  <p style={{ marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: i18n.t('settings.version') }}></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};