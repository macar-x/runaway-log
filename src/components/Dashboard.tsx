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
import { Statistics } from './Statistics';
import { i18n } from '../i18n/i18n';
import './Dashboard.css';

interface DashboardProps {
  username: string;
  onLogout: () => void;
  showHeader?: boolean;
}

export const Dashboard = ({ username, onLogout, showHeader = true }: DashboardProps) => {
  const [userData, setUserData] = useState<UserData>(() => {
    const data = loadUserData(username);
    return data || { username, hits: [] };
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [quote, setQuote] = useState<string>(() => getRandomQuote());
  const [importDialog, setImportDialog] = useState<{ show: boolean; data: UserData | null }>({ show: false, data: null });
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timezone, setTimezone] = useState<string>(() => getSavedTimezone());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [gameSettings, setGameSettings] = useState<{ forkInTheRoadEnabled?: boolean }>({});
  const [correctButtonIndex, setCorrectButtonIndex] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([null, null, null]);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format current time using user's timezone
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: timezone
  });

  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, {
        opacity: [0, 1],
        duration: 600,
        ease: 'out(3)',
      });
    }
  }, []);

  // Update quote when language changes
  useEffect(() => {
    const unsubscribe = i18n.onLanguageChange(() => {
      setQuote(getRandomQuote());
    });

    return () => unsubscribe();
  }, []);

  // Load game settings from user data
  useEffect(() => {
    const userData = loadUserData(username);
    if (userData?.settings?.games) {
      setGameSettings(userData.settings.games);
    }
  }, [username]);

  // Set random correct button when game settings change or after each attempt
  useEffect(() => {
    if (gameSettings.forkInTheRoadEnabled) {
      setCorrectButtonIndex(Math.floor(Math.random() * 3));
    }
  }, [gameSettings.forkInTheRoadEnabled, correctButtonIndex]);

  const handleHit = (buttonIndex?: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Check if Fork in the Road game is enabled
    const isForkGameEnabled = gameSettings.forkInTheRoadEnabled;
    const isCorrectButton = isForkGameEnabled ? buttonIndex === correctButtonIndex : true;
    
    // Easter egg: 0.6% chance for boom animation
    const isBoom = Math.random() < 0.006;
    
    // Determine which button to animate
    const targetButton = isForkGameEnabled ? buttonRefs.current[buttonIndex || 0] : buttonRef.current;
    
    if (targetButton) {
      if (isBoom) {
        // Boom animation - more intense
        animate(targetButton, {
          scale: [1, 1.5, 0.8, 1.2, 1],
          rotate: [0, -15, 15, -10, 10, 0],
          duration: 800,
          ease: 'inOut(3)',
        });

        // Explosion effect
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.textContent = '💥';
        targetButton.parentElement?.appendChild(explosion);
        
        animate(explosion, {
          scale: [0, 3, 2.5],
          rotate: [0, 360],
          opacity: [0, 1, 0],
          duration: 1200,
          ease: 'out(3)',
          onComplete: () => explosion.remove(),
        });

        // Multiple explosion particles
        const particles = ['💥', '✨', '⭐', '🔥', '💫'];
        for (let i = 0; i < 8; i++) {
          const particle = document.createElement('div');
          particle.className = 'explosion-particle';
          particle.textContent = particles[Math.floor(Math.random() * particles.length)];
          targetButton.parentElement?.appendChild(particle);
          
          const angle = (Math.PI * 2 * i) / 8;
          const distance = 150 + Math.random() * 100;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance;
          
          animate(particle, {
            translateX: [0, tx],
            translateY: [0, ty],
            scale: [0, 1.5, 0],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [1, 1, 0],
            duration: 1000 + Math.random() * 500,
            ease: 'out(2)',
            onComplete: () => particle.remove(),
          });
        }

        // Change quote to something funny
        setQuote(i18n.t('easter_eggs.boom_quote'));
        
        setTimeout(() => setIsAnimating(false), 800);
        // Reset correct button index for next attempt if Fork game is enabled
        if (isForkGameEnabled) {
          setCorrectButtonIndex(Math.floor(Math.random() * 3));
        }
        return; // Don't record this hit
      }

      // Normal animation
      animate(targetButton, {
        scale: [1, 1.3, 0.9, 1.1, 1],
        rotate: [0, -10, 10, -5, 0],
        duration: 600,
        ease: 'inOut(2)',
      });

      // Ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      targetButton.appendChild(ripple);
      
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
      
      if (isForkGameEnabled && !isCorrectButton) {
        // Failed attempt animation
        emoji.textContent = '😓'; // Sweating emoji
      } else {
        emoji.textContent = '🏃'; // Running emoji
      }
      
      // Flip emoji if going right
      if (!goLeft) {
        emoji.style.display = 'inline-block';
        emoji.style.transform = 'scaleX(-1)';
      }
      
      runner.appendChild(emoji);
      targetButton.parentElement?.appendChild(runner);
      
      if (isForkGameEnabled && !isCorrectButton) {
        // Failed attempt: up and down shake animation
        animate(runner, {
          translateY: [0, -10, 10, -10, 10, 0],
          scale: [1, 1.2, 1, 1.2, 1],
          opacity: [0, 1, 1, 1, 1, 0],
          duration: 1000,
          ease: 'inOut(2)',
          onComplete: () => runner.remove(),
        });
      } else {
        // Successful attempt: normal running animation
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
    }

    // Add hit to storage only if it's the correct button or not in Fork game mode
    if (isCorrectButton) {
      const newHit = addHit(username);
      if (newHit) {
        setUserData(prev => ({
          ...prev,
          hits: [...prev.hits, newHit],
        }));
      }

      // Change quote on successful hit
      setQuote(getRandomQuote());
    }

    setTimeout(() => setIsAnimating(false), 600);
    
    // Reset correct button index for next attempt if Fork game is enabled
    if (isForkGameEnabled) {
      setTimeout(() => {
        setCorrectButtonIndex(Math.floor(Math.random() * 3));
      }, 600);
    }
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
      alert(i18n.t('errors.import_failed', { error: error instanceof Error ? error.message : 'Unknown error' }));
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
    alert(i18n.t('errors.import_merged', { count: newHits.length }));
    
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
    alert(i18n.t('errors.import_replaced', { count: importDialog.data.hits.length }));
    
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
      {showHeader && (
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
              {i18n.t('dashboard.logout')}
            </button>
          </div>
        </header>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportFile}
        style={{ display: 'none' }}
      />

      <main className="dashboard-main">
        <div className="hit-section">
          <h2 className="section-title">{formattedTime}</h2>
          
          {gameSettings.forkInTheRoadEnabled ? (
            <div className="fork-buttons-container">
              <button
                ref={(el) => { buttonRefs.current[0] = el; }}
                onClick={() => handleHit(0)}
                className="hit-button fork-button"
                disabled={isAnimating}
              >
                <span className="hit-button-text">岔路1</span>
                <span className="hit-button-icon">➡️</span>
              </button>
              <button
                ref={(el) => { buttonRefs.current[1] = el; }}
                onClick={() => handleHit(1)}
                className="hit-button fork-button"
                disabled={isAnimating}
              >
                <span className="hit-button-text">岔路2</span>
                <span className="hit-button-icon">➡️</span>
              </button>
              <button
                ref={(el) => { buttonRefs.current[2] = el; }}
                onClick={() => handleHit(2)}
                className="hit-button fork-button"
                disabled={isAnimating}
              >
                <span className="hit-button-text">岔路3</span>
                <span className="hit-button-icon">➡️</span>
              </button>
            </div>
          ) : (
            <button
              ref={buttonRef}
              onClick={() => handleHit()}
              className="hit-button"
              disabled={isAnimating}
            >
              <span className="hit-button-text">{i18n.t('dashboard.run_button')}</span>
              <span className="hit-button-icon">🏃</span>
            </button>
          )}
          
          <p className="motivational-quote">"{quote}"</p>
          <p className="hit-count" dangerouslySetInnerHTML={{ __html: i18n.t('dashboard.hit_count', { count: userData.hits.length }) }} />
        </div>

        {userData.hits.length > 0 && (
          <>
            <div className="data-section">
              <Statistics hits={userData.hits} timezone={timezone} />
              <HitCalendar 
                hits={userData.hits} 
                currentMonth={currentMonth}
                onMonthChange={setCurrentMonth}
                timezone={timezone}
              />
            </div>
            <HitLogs hits={userData.hits} timezone={timezone} />
          </>
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
            <h3 className="import-dialog-title">{i18n.t('import_dialog.title')}</h3>
            <div className="import-dialog-content">
              <p className="import-info">
                <strong>{i18n.t('import_dialog.from')}</strong> {importDialog.data.username}<br />
                <strong>{i18n.t('import_dialog.escape_dreams')}</strong> {importDialog.data.hits.length}
              </p>
              {importDialog.data.username !== username && (
                <p className="import-warning" dangerouslySetInnerHTML={{ __html: i18n.t('import_dialog.warning', { username: importDialog.data.username, currentUsername: username }) }} />
              )}
              <p className="import-description">
                <strong>Merge:</strong> {i18n.t('import_dialog.merge')}<br />
                <strong>Replace:</strong> {i18n.t('import_dialog.replace')}
              </p>
            </div>
            <div className="import-dialog-actions">
              <button onClick={handleImportMerge} className="import-dialog-btn merge-btn">
                {i18n.t('import_dialog.merge_button')}
              </button>
              <button onClick={handleImportReplace} className="import-dialog-btn replace-btn">
                {i18n.t('import_dialog.replace_button')}
              </button>
              <button onClick={handleImportCancel} className="import-dialog-btn cancel-btn">
                {i18n.t('import_dialog.cancel_button')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
