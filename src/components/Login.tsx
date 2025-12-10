import { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { i18n } from '../i18n/i18n';
import './Login.css';

interface LoginProps {
  onLogin: (username: string) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.getLanguage());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, {
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        ease: 'out(3)',
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as any;
    setSelectedLanguage(newLanguage);
    i18n.setLanguage(newLanguage);
  };

  return (
    <div className="login-container" ref={containerRef}>
      <div className="login-card">
        <div className="login-language-selector">
          <select 
            value={selectedLanguage} 
            onChange={handleLanguageChange} 
            className="language-select"
            aria-label="Select language"
          >
            {i18n.getSupportedLanguages().map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        <h1 className="login-title">{i18n.t('login.title')}</h1>
        <p className="login-subtitle">{i18n.t('login.subtitle')}</p>
        <p className="login-slogan">"{i18n.t('login.slogan')}"</p>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="username" className="login-label">
              {i18n.t('login.username')}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={i18n.t('login.placeholder_username')}
              className="login-input"
              autoFocus
              maxLength={20}
            />
          </div>
          
          <div className="login-form-group">
            <label htmlFor="password" className="login-label">
              {i18n.t('login.password')}
            </label>
            <input
              id="password"
              type="password"
              placeholder={i18n.t('login.placeholder_password')}
              className="login-input disabled"
              disabled
            />
          </div>
          
          <button type="submit" className="login-button" disabled={!username.trim()}>
            {i18n.t('login.button')}
          </button>
        </form>
      </div>
    </div>
  );
};
