import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Layout } from '../components/Layout';
import { loadUserData, saveUserData } from '../storage';
import { exportUserData, importUserData } from '../exportImport';
import { i18n } from '../i18n/i18n';

export const Storage = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('runawaylog-username') || '';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importDialog, setImportDialog] = useState<{ show: boolean; data: { username: string; hits: Array<{ id: string; timestamp: number; date: string }> } | null }>({ show: false, data: null });
  
  const handleLogout = () => {
    sessionStorage.removeItem('runawaylog-username');
    navigate('/');
    window.location.reload();
  };

  const handleExport = () => {
    const userData = loadUserData(username);
    if (userData) {
      exportUserData(userData);
    }
  };
  
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      const importedData = await importUserData(file);
      setImportDialog({ show: true, data: importedData });
    } catch (error) {
      alert(i18n.t('errors.import_failed', { error: error instanceof Error ? error.message : 'Unknown error' }));
    }
    
    if (event.target) {
      event.target.value = '';
    }
  };
  
  const handleImportMerge = () => {
    if (!importDialog.data) return;
    
    const userData = loadUserData(username) || { username, hits: [] };
    const existingIds = new Set(userData.hits.map(h => h.id));
    const newHits = importDialog.data.hits.filter(h => !existingIds.has(h.id));
    const mergedData = {
      ...userData,
      hits: [...userData.hits, ...newHits].sort((a, b) => a.timestamp - b.timestamp),
    };
    
    saveUserData(mergedData);
    
    setImportDialog({ show: false, data: null });
    alert(i18n.t('errors.import_merged', { count: newHits.length }));
    
    window.location.reload();
  };
  
  const handleImportReplace = () => {
    if (!importDialog.data) return;
    
    const userData = loadUserData(username) || { username, hits: [] };
    const replacedData = {
      ...userData,
      hits: importDialog.data.hits,
    };
    
    saveUserData(replacedData);
    
    setImportDialog({ show: false, data: null });
    alert(i18n.t('errors.import_replaced', { count: importDialog.data.hits.length }));
    
    window.location.reload();
  };
  
  const handleImportCancel = () => {
    setImportDialog({ show: false, data: null });
  };

  const handlePrint = () => {
    window.print();
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
          {i18n.t('storage.title')}
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'rgba(255, 255, 255, 0.9)', 
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          {i18n.t('storage.description')}
        </p>

        {/* Local Data Management */}
        <div style={{ 
          background: 'var(--bg-primary)', 
          padding: '2rem', 
          borderRadius: '20px',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1.5rem',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {i18n.t('settings.data_management')}
          </h2>
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button onClick={handleExport} style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {i18n.t('settings.export_data')}
            </button>
            <button onClick={handleImportClick} style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {i18n.t('settings.import_data')}
            </button>
            <button onClick={handlePrint} style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {i18n.t('settings.print_calendar')}
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportFile}
            style={{ display: 'none' }}
          />
        </div>

        {/* Remote Storage Options */}
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
              {i18n.t('storage.webdav')}
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {i18n.t('storage.webdav_description')}
            </p>
            <span style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '20px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-tertiary)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              {i18n.t('storage.coming_soon')}
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
              {i18n.t('storage.firebase')}
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {i18n.t('storage.firebase_description')}
            </p>
            <span style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '20px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-tertiary)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              {i18n.t('storage.coming_soon')}
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
              {i18n.t('storage.supabase')}
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {i18n.t('storage.supabase_description')}
            </p>
            <span style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '20px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-tertiary)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              {i18n.t('storage.coming_soon')}
            </span>
          </div>

          {/* Import Dialog */}
          {importDialog.show && importDialog.data && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              backdropFilter: 'blur(5px)'
            }}>
              <div style={{
                background: 'var(--bg-primary)',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '500px',
                width: '90%',
                boxShadow: 'var(--shadow-lg)',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  marginBottom: '1.5rem',
                  color: 'var(--text-primary)'
                }}>
                  {i18n.t('import_dialog.title')}
                </h3>
                <div style={{
                  marginBottom: '1.5rem',
                  textAlign: 'left'
                }}>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong>{i18n.t('import_dialog.from')}</strong> {importDialog.data.username}<br />
                    <strong>{i18n.t('import_dialog.escape_dreams')}</strong> {importDialog.data.hits.length}
                  </p>
                  {importDialog.data.username !== username && (
                    <p style={{
                      background: 'var(--bg-secondary)',
                      padding: '1rem',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem'
                    }} dangerouslySetInnerHTML={{ 
                      __html: i18n.t('import_dialog.warning', { 
                        username: importDialog.data.username, 
                        currentUsername: username 
                      }) 
                    }} />
                  )}
                  <p style={{ marginBottom: '1rem' }}>
                    <strong>{i18n.t('import_dialog.merge')}</strong><br />
                    <strong>{i18n.t('import_dialog.replace')}</strong>
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button onClick={handleImportMerge} style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    color: 'white'
                  }}>
                    {i18n.t('import_dialog.merge_button')}
                  </button>
                  <button onClick={handleImportReplace} style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #f44336 0%, #da190b 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    color: 'white'
                  }}>
                    {i18n.t('import_dialog.replace_button')}
                  </button>
                  <button onClick={handleImportCancel} style={{
                    padding: '0.75rem 1.5rem',
                    background: 'var(--bg-secondary)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                  }}>
                    {i18n.t('import_dialog.cancel_button')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
};
