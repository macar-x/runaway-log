import { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import type { UserData } from '../types';
import { addHit, loadUserData, saveUserData } from '../storage';
import { getRandomQuote } from '../quotes';
import { exportUserData, importUserData } from '../exportImport';
import { getSavedTimezone, saveTimezone } from '../timezone';
import { setTheme } from '../darkMode';
import { HitCalendar } from './HitCalendar';
import { HitLogs } from './HitLogs';
import { PrintCalendar } from './PrintCalendar';
import { SettingsMenu } from './SettingsMenu';
import './Dashboard.css';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

export const Dashboard = ({ username, onLogout }: DashboardProps) => {
  const [userData, setUserData] = useState<UserData>({ username, hits: [] });
  const [isAnimating, setIsAnimating] = useState(false);
  const [quote, setQuote] = useState<string>('');
  const [importDialog, setImportDialog] = useState<{ show: boolean; data: UserData | null }>({ show: false, data: null });
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timezone, setTimezone] = useState<string>(() => getSavedTimezone());
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const data = loadUserData(username);
    if (data) {
      setUserData(data);
    }

    // Set initial random quote
    setQuote(getRandomQuote());

    if (containerRef.current) {
      animate(containerRef.current, {
        opacity: [0, 1],
        duration: 600,
        ease: 'out(3)',
      });
    }
  }, [username]);

  const handleHit = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Button animation
    if (buttonRef.current) {
      animate(buttonRef.current, {
        scale: [1, 1.3, 0.9, 1.1, 1],
        rotate: [0, -10, 10, -5, 0],
        duration: 600,
        ease: 'inOut(2)',
      });

      // Ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      buttonRef.current.appendChild(ripple);
      
      animate(ripple, {
        scale: [0, 4],
        opacity: [0.6, 0],
        duration: 800,
        ease: 'out(3)',
        onComplete: () => ripple.remove(),
      });

      // Running person animation with random variations
      const runner = document.createElement('div');
      runner.className = 'running-person';
      
      // Random direction: left or right
      const goLeft = Math.random() < 0.5;
      
      // Create inner span for the emoji
      const emoji = document.createElement('span');
      emoji.textContent = '🏃';
      
      // Flip emoji if going right
      if (!goLeft) {
        emoji.style.display = 'inline-block';
        emoji.style.transform = 'scaleX(-1)';
      }
      
      runner.appendChild(emoji);
      buttonRef.current.parentElement?.appendChild(runner);
      
      // Random variations for each run
      const randomDistance = 350 + Math.random() * 150; // 350-500px
      const direction = goLeft ? -randomDistance : randomDistance; // Negative for left, positive for right
      const randomBounce1 = -15 - Math.random() * 15; // -15 to -30px
      const randomBounce2 = -5 - Math.random() * 10; // -5 to -15px
      const randomDuration = 1200 + Math.random() * 600; // 1200-1800ms
      const randomStartY = -20 + Math.random() * 40; // -20 to +20px vertical offset
      
      // Set random starting vertical position
      runner.style.top = `calc(50% + ${randomStartY}px)`;
      
      animate(runner, {
        translateX: [0, direction],
        translateY: [0, randomBounce1, 0, randomBounce2, 0],
        opacity: [0, 1, 1, 1, 0],
        duration: randomDuration,
        ease: 'out(2)',
        onComplete: () => runner.remove(),
      });
    }

    // Add hit to storage
    const newHit = addHit(username);
    if (newHit) {
      setUserData(prev => ({
        ...prev,
        hits: [...prev.hits, newHit],
      }));
    }

    // Change quote on each hit
    setQuote(getRandomQuote());

    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleExport = () => {
    exportUserData(userData);
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
      alert(`❌ Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Reset file input
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleImportMerge = () => {
    if (!importDialog.data) return;
    
    const existingIds = new Set(userData.hits.map(h => h.id));
    const newHits = importDialog.data.hits.filter(h => !existingIds.has(h.id));
    const mergedData = {
      username: username, // Keep current username
      hits: [...userData.hits, ...newHits].sort((a, b) => a.timestamp - b.timestamp),
    };
    setUserData(mergedData);
    saveUserData(mergedData);
    
    // Apply imported settings if available
    if (importDialog.data.settings) {
      applyImportedSettings(importDialog.data.settings);
    }
    
    setImportDialog({ show: false, data: null });
    alert(`✅ Merged ${newHits.length} new escape dreams!`);
    
    // Refresh page to apply all settings
    window.location.reload();
  };

  const handleImportReplace = () => {
    if (!importDialog.data) return;
    
    const replacedData = {
      username: username, // Keep current username
      hits: importDialog.data.hits,
    };
    setUserData(replacedData);
    saveUserData(replacedData);
    
    // Apply imported settings if available
    if (importDialog.data.settings) {
      applyImportedSettings(importDialog.data.settings);
    }
    
    setImportDialog({ show: false, data: null });
    alert(`✅ Replaced with ${importDialog.data.hits.length} escape dreams!`);
    
    // Refresh page to apply all settings
    window.location.reload();
  };

  const handleImportCancel = () => {
    setImportDialog({ show: false, data: null });
  };

  const handleTimezoneChange = () => {
    setTimezone(getSavedTimezone());
  };

  const applyImportedSettings = (settings: NonNullable<UserData['settings']>) => {
    if (settings.timezone) {
      saveTimezone(settings.timezone);
    }
    if (settings.theme) {
      localStorage.setItem('calendar-theme', settings.theme);
    }
    if (settings.darkMode) {
      setTheme(settings.darkMode);
    }
  };

  return (
    <div className="dashboard-container" ref={containerRef}>
      <header className="dashboard-header">
        <div className="user-info">
          <span className="user-icon">👤</span>
          <span className="username">{username}</span>
        </div>
        <div className="header-actions">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportFile}
            style={{ display: 'none' }}
          />
          <SettingsMenu
            onExport={handleExport}
            onImport={handleImportClick}
            onPrint={() => setShowPrintDialog(true)}
            onTimezoneChange={handleTimezoneChange}
          />
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="hit-section">
          <h2 className="section-title">Dreaming of Escape?</h2>
          <button
            ref={buttonRef}
            onClick={handleHit}
            className="hit-button"
            disabled={isAnimating}
          >
            <span className="hit-button-text">RUN</span>
            <span className="hit-button-icon">🏃</span>
          </button>
          <p className="motivational-quote">"{quote}"</p>
          <p className="hit-count">
            Escape Dreams: <strong>{userData.hits.length}</strong>
          </p>
        </div>

        {userData.hits.length > 0 && (
          <div className="data-section">
            <HitCalendar 
              hits={userData.hits} 
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
              timezone={timezone}
            />
            <HitLogs hits={userData.hits} timezone={timezone} />
          </div>
        )}
      </main>

      {showPrintDialog && (
        <PrintCalendar
          hits={userData.hits}
          username={username}
          currentMonth={currentMonth}
          onClose={() => setShowPrintDialog(false)}
          timezone={timezone}
        />
      )}

      {importDialog.show && importDialog.data && (
        <div className="import-dialog-overlay">
          <div className="import-dialog">
            <h3 className="import-dialog-title">Import Data</h3>
            <div className="import-dialog-content">
              <p className="import-info">
                <strong>From:</strong> {importDialog.data.username}<br />
                <strong>Escape Dreams:</strong> {importDialog.data.hits.length}
              </p>
              {importDialog.data.username !== username && (
                <p className="import-warning">
                  ⚠️ This data is from a different user ({importDialog.data.username}).<br />
                  The data will be imported to your current account ({username}).<br />
                  If you want to import to "{importDialog.data.username}", please logout and login as that user first.
                </p>
              )}
              <p className="import-description">
                <strong>Merge:</strong> Add new dreams to your current data<br />
                <strong>Replace:</strong> Replace all your data with imported data
              </p>
            </div>
            <div className="import-dialog-actions">
              <button onClick={handleImportMerge} className="import-dialog-btn merge-btn">
                Merge
              </button>
              <button onClick={handleImportReplace} className="import-dialog-btn replace-btn">
                Replace
              </button>
              <button onClick={handleImportCancel} className="import-dialog-btn cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
