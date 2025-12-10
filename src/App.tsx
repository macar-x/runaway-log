import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ModeProvider } from './contexts/ModeContext';
import { Login } from './components/Login';
import { Home } from './pages/Home';
import { GamesHub } from './pages/games/GamesHub';
import { CardGame } from './pages/games/CardGame';
import { Storage } from './pages/Storage';
import { Releases } from './pages/Releases';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
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
        <Route path="/storage" element={<Storage />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
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
