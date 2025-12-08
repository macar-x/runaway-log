import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';

export const CardGame = () => {
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
      padding: '3rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        background: 'var(--bg-primary)', 
        padding: '3rem', 
        borderRadius: '20px',
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🃏</div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Card Drop Game
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Coming in the next update! Collect random cards with each escape dream.
        </p>
        <div style={{ 
          background: 'var(--bg-secondary)', 
          padding: '1.5rem', 
          borderRadius: '12px',
          marginBottom: '1rem'
        }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Features:</h3>
          <ul style={{ 
            textAlign: 'left', 
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>🎴 Collectible card system with 4 rarity levels</li>
            <li>✨ Random card drops with each hit</li>
            <li>📚 Card gallery to view your collection</li>
            <li>🏆 Achievement system for completing sets</li>
            <li>🎨 Beautiful card designs and animations</li>
          </ul>
        </div>
      </div>
    </div>
    </Layout>
  );
};
