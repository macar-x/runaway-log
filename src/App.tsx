import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ModeProvider, useMode } from './contexts/ModeContext';
import { Login } from './components/Login';
import { EmailPrompt } from './components/EmailPrompt';
import { Home } from './pages/Home';
import { GamesHub } from './pages/games/GamesHub';
import { CardGame } from './pages/games/CardGame';
import { Storage } from './pages/Storage';
import { Releases } from './pages/Releases';
import { About } from './pages/About';
import { Profile } from './pages/Profile';
import { loadUserData, saveUserData } from './storage';
import './App.css';

function AppContent() {
  const [username, setUsername] = useState<string | null>(() => {
    return sessionStorage.getItem('runawaylog-username');
  });
  const { mode } = useMode();
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);

  useEffect(() => {
    // Check if user switched to Pro mode and doesn't have email
    if (username && mode === 'pro') {
      const userData = loadUserData(username);
      if (userData && !userData.profile?.email) {
        const hasSeenPrompt = sessionStorage.getItem(`email-prompt-seen-${username}`);
        if (!hasSeenPrompt) {
          setShowEmailPrompt(true);
        }
      }
    }
  }, [mode, username]);

  const handleLogin = (user: string) => {
    setUsername(user);
    sessionStorage.setItem('runawaylog-username', user);
  };

  const handleLogout = () => {
    setUsername(null);
    sessionStorage.removeItem('runawaylog-username');
  };

  const handleSaveEmail = (email: string) => {
    if (username) {
      const userData = loadUserData(username);
      if (userData) {
        const updatedData = {
          ...userData,
          profile: {
            ...userData.profile,
            email: email,
            registrationDate: userData.profile?.registrationDate || Date.now(),
          },
        };
        saveUserData(updatedData);
      }
    }
    sessionStorage.setItem(`email-prompt-seen-${username}`, 'true');
    setShowEmailPrompt(false);
  };

  const handleSkipEmail = () => {
    sessionStorage.setItem(`email-prompt-seen-${username}`, 'true');
    setShowEmailPrompt(false);
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  // Both modes use unified navigation
  return (
    <div className="app">
      {showEmailPrompt && (
        <EmailPrompt
          username={username}
          onSave={handleSaveEmail}
          onSkip={handleSkipEmail}
        />
      )}
      <Routes>
        <Route path="/" element={<Home username={username} onLogout={handleLogout} />} />
        {mode === 'pro' && (
          <>
            <Route path="/games" element={<GamesHub />} />
            <Route path="/games/cards" element={<CardGame />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/releases" element={<Releases />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ModeProvider>
        <AppContent />
      </ModeProvider>
    </BrowserRouter>
  );
}

export default App;
