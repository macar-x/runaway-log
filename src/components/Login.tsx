import { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { i18n } from '../i18n/i18n';
import { login, register } from '../auth';
import './Login.css';

interface LoginProps {
  onLogin: (username: string) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError(i18n.t('login.error.username_required'));
      return;
    }
    
    setLoading(true);
    
    try {
      if (isRegistering) {
        // 注册时仍需要密码
        if (!password.trim()) {
          setError(i18n.t('login.error.password_required'));
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError(i18n.t('login.error.password_too_short'));
          setLoading(false);
          return;
        }
        await register(username.trim(), password.trim(), email.trim() || undefined);
      } else {
        // 登录时不需要密码，使用默认密码
        await login(username.trim(), '');
      }
      
      onLogin(username.trim());
    } catch (err: any) {
      // Handle specific error messages
      let errorMessage = '';
      if (err.message === 'Username already exists') {
        errorMessage = i18n.t('login.error.username_taken');
      } else if (err.message === 'Invalid username or password') {
        errorMessage = i18n.t('login.error.invalid_credentials');
      } else if (err.message === 'Password must be at least 6 characters long') {
        errorMessage = i18n.t('login.error.password_too_short');
      } else {
        errorMessage = isRegistering ? i18n.t('login.error.registration_failed') : i18n.t('login.error.login_failed');
      }
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
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
        
        <h1 className="login-title">{i18n.t(isRegistering ? 'login.register_title' : 'login.title')}</h1>
        <p className="login-subtitle">{i18n.t(isRegistering ? 'login.register_subtitle' : 'login.subtitle')}</p>
        <p className="login-slogan">"{i18n.t('login.slogan')}"</p>
        
        {error && <div className="login-error">{error}</div>}
        
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
              disabled={loading}
            />
          </div>
          
          {isRegistering && (
            <div className="login-form-group">
              <label htmlFor="email" className="login-label">
                {i18n.t('login.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={i18n.t('login.placeholder_email')}
                className="login-input"
                disabled={loading}
              />
            </div>
          )}
          
          {isRegistering ? (
            <div className="login-form-group">
              <label htmlFor="password" className="login-label">
                {i18n.t('login.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={i18n.t('login.placeholder_password')}
                className="login-input"
                disabled={loading}
              />
            </div>
          ) : (
            <div className="login-form-group">
              <label htmlFor="password" className="login-label">
                {i18n.t('login.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={i18n.t('login.passwordless_login')}
                className="login-input disabled"
                disabled={true}
              />
            </div>
          )}
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? i18n.t('login.loading') : i18n.t(isRegistering ? 'login.register_button' : 'login.button')}
          </button>
          
          <div className="login-toggle">
            <button 
              type="button" 
              className="login-toggle-button"
              onClick={() => setIsRegistering(!isRegistering)}
              disabled={loading}
            >
              {i18n.t(isRegistering ? 'login.switch_to_login' : 'login.switch_to_register')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
