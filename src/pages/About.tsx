import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';

export const About = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('runawaylog-username') || '';
  
  const handleLogout = () => {
    sessionStorage.removeItem('runawaylog-username');
    navigate('/');
    window.location.reload();
  };

  return (
    <Layout username={username} onLogout={handleLogout}>
    <div style={{ 
      minHeight: 'calc(100vh - 80px)', 
      background: 'linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%)',
      padding: '3rem 2rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          background: 'var(--bg-primary)', 
          padding: '3rem', 
          borderRadius: '20px',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🏃</div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            RunawayLog
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: 'var(--accent-primary)', 
            fontStyle: 'italic',
            marginBottom: '2rem'
          }}>
            Track your desire to escape the daily grind
          </p>

          <div style={{ 
            textAlign: 'left', 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>What is this?</h2>
            <p style={{ marginBottom: '1rem' }}>
              RunawayLog is a simple yet powerful app to track when you dream of escaping work, 
              meetings, or routine. Every click represents a moment when you wished you could 
              break free and do something else.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              See patterns in your escape dreams with a beautiful calendar heatmap, get motivated 
              by inspirational quotes, and track your statistics over time.
            </p>
          </div>

          <div style={{ 
            background: 'var(--bg-secondary)', 
            padding: '1.5rem', 
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Privacy First</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              All your data stays private in your browser's local storage. We don't collect, 
              store, or transmit any of your information. You have full control with export 
              and import features.
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <a 
              href="https://github.com/macar-x/runaway-log" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                transition: 'transform 0.3s ease'
              }}
            >
              ⭐ GitHub
            </a>
            <a 
              href="https://github.com/macar-x/runaway-log/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                padding: '0.75rem 1.5rem',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                transition: 'transform 0.3s ease'
              }}
            >
              🐛 Report Issue
            </a>
          </div>

          <div style={{ 
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            color: 'var(--text-tertiary)',
            fontSize: '0.9rem'
          }}>
            <p>Built with ❤️ using React, TypeScript, and Vite</p>
            <p style={{ marginTop: '0.5rem' }}>
              Powered by <strong>Ona</strong>, the AI software engineering agent
            </p>
            <p style={{ marginTop: '1rem' }}>
              Version 1.1.0 • MIT License • © 2025
            </p>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};
