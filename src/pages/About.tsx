import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { i18n } from '../i18n/i18n';
import './Settings.css';

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
      <div className="settings-page">
        <div className="settings-container">
          <h1 className="settings-title">{i18n.t('settings.about')}</h1>
          
          <div className="settings-grid">
            <div className="settings-card">
              <div className="about-content">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏃</div>
                <h3 style={{ marginBottom: '1rem' }}>{i18n.t('dashboard.brand_title')}</h3>
                <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                  {i18n.t('settings.about_description')}
                </p>
                <div style={{ 
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1rem',
                  marginTop: '1rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-tertiary)'
                }}>
                  <p dangerouslySetInnerHTML={{ __html: i18n.t('settings.built_with') }}></p>
                  <p style={{ marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: i18n.t('settings.version') }}></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};