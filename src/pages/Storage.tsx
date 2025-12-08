import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';

export const Storage = () => {
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
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          color: 'white', 
          textAlign: 'center',
          marginBottom: '1rem',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}>
          ☁️ Remote Storage
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'rgba(255, 255, 255, 0.9)', 
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Sync your data across devices
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{ 
            background: 'var(--bg-primary)', 
            padding: '2rem', 
            borderRadius: '20px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              WebDAV
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Connect to your own WebDAV server for complete control over your data.
            </p>
            <span style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '20px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-tertiary)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              Coming Soon
            </span>
          </div>

          <div style={{ 
            background: 'var(--bg-primary)', 
            padding: '2rem', 
            borderRadius: '20px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔥</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Firebase
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Real-time sync with Google Firebase for instant updates across devices.
            </p>
            <span style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '20px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-tertiary)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              Coming Soon
            </span>
          </div>

          <div style={{ 
            background: 'var(--bg-primary)', 
            padding: '2rem', 
            borderRadius: '20px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Supabase
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Open-source backend with PostgreSQL database and real-time subscriptions.
            </p>
            <span style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '20px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-tertiary)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};
