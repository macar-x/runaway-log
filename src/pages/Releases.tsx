import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';

export const Releases = () => {
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
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          color: 'white', 
          textAlign: 'center',
          marginBottom: '1rem',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}>
          📋 Release Notes
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'rgba(255, 255, 255, 0.9)', 
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          What's new in RunawayLog
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ 
            background: 'var(--bg-primary)', 
            padding: '2rem', 
            borderRadius: '20px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ 
                background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                v1.1.0 - Latest
              </span>
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                December 8, 2025
              </span>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Pro Mode & Major Updates
            </h3>
            <ul style={{ 
              color: 'var(--text-secondary)', 
              lineHeight: '1.8',
              paddingLeft: '1.5rem'
            }}>
              <li>🎮 Pro Mode with navigation and multiple pages</li>
              <li>📊 Statistics dashboard with streaks and insights</li>
              <li>📱 PWA support for offline use and installation</li>
              <li>🧪 Testing infrastructure with 39 unit tests</li>
              <li>📱 Complete mobile responsiveness fixes</li>
              <li>🌍 Browser timezone auto-detection</li>
            </ul>
          </div>

          <div style={{ 
            background: 'var(--bg-primary)', 
            padding: '2rem', 
            borderRadius: '20px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ 
                background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                v1.0.0
              </span>
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                December 2, 2025
              </span>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Initial Release
            </h3>
            <ul style={{ 
              color: 'var(--text-secondary)', 
              lineHeight: '1.8',
              paddingLeft: '1.5rem'
            }}>
              <li>🏃 One-click escape tracking</li>
              <li>📅 90-day calendar heatmap</li>
              <li>🎨 6 color themes</li>
              <li>🌙 Dark mode support</li>
              <li>📤 Export/Import data</li>
              <li>🖨️ Print calendar</li>
              <li>⚙️ Settings menu</li>
              <li>🌍 Timezone support</li>
              <li>💥 Easter egg boom animation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};
