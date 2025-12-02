import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import './App.css';

function App() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedUsername = sessionStorage.getItem('runawaylog-username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLogin = (user: string) => {
    setUsername(user);
    sessionStorage.setItem('runawaylog-username', user);
  };

  const handleLogout = () => {
    setUsername(null);
    sessionStorage.removeItem('runawaylog-username');
  };

  return (
    <div className="app">
      {username ? (
        <Dashboard username={username} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
