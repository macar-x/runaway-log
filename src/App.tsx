import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Home } from './pages/Home';
import { GamesHub } from './pages/games/GamesHub';
import { CardGame } from './pages/games/CardGame';

import { Releases } from './pages/Releases';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { i18n } from './i18n/i18n';
import './App.css';

function AppContent() {
  const [username, setUsername] = useState<string | null>(() => {
    return sessionStorage.getItem('runawaylog-username');
  });

  const handleLogin = (user: string) => {
    setUsername(user);
    sessionStorage.setItem('runawaylog-username', user);
  };

  const handleLogout = () => {
    setUsername(null);
    sessionStorage.removeItem('runawaylog-username');
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home username={username} onLogout={handleLogout} />} />
        <Route path="/games" element={<GamesHub />} />
        <Route path="/games/cards" element={<CardGame />} />

        <Route path="/releases" element={<Releases />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  // Update document title and meta description when language changes
  useEffect(() => {
    const updateMetaInfo = () => {
      document.title = i18n.t('meta.title');
      
      const descriptionMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (descriptionMeta) {
        descriptionMeta.content = i18n.t('meta.description');
      }
      
      // Also update apple-mobile-web-app-title for iOS home screen
      const appleTitleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]') as HTMLMetaElement | null;
      if (appleTitleMeta) {
        appleTitleMeta.content = i18n.t('dashboard.brand_title');
      }
    };
    
    // Initial update
    updateMetaInfo();
    
    // Subscribe to language changes
    const unsubscribe = i18n.onLanguageChange(updateMetaInfo);
    
    return () => unsubscribe();
  }, []);
  
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
