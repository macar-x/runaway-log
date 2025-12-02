import { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import './Login.css';

interface LoginProps {
  onLogin: (username: string) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
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

  return (
    <div className="login-container" ref={containerRef}>
      <div className="login-card">
        <h1 className="login-title">🏃 RunawayLog</h1>
        <p className="login-subtitle">Track your desire to escape the daily grind</p>
        <p className="login-slogan">"Every click is a dream of freedom"</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="login-input"
            autoFocus
            maxLength={20}
          />
          <button type="submit" className="login-button" disabled={!username.trim()}>
            Let's Go! 🚀
          </button>
        </form>
      </div>
    </div>
  );
};
