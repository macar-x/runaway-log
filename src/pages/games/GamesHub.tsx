import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { loadUserData, saveUserData } from '../../storage';
import './GamesHub.css';

export const GamesHub = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('runawaylog-username') || '';
  const [forkInTheRoadEnabled, setForkInTheRoadEnabled] = useState(false);
  
  const handleLogout = () => {
    sessionStorage.removeItem('runawaylog-username');
    navigate('/');
    window.location.reload();
  };
  
  // Load game settings from user data
  useEffect(() => {
    const userData = loadUserData(username);
    if (userData?.settings?.games?.forkInTheRoadEnabled) {
      setForkInTheRoadEnabled(userData.settings.games.forkInTheRoadEnabled);
    }
  }, [username]);
  
  // Save game settings to user data
  const handleForkInTheRoadToggle = () => {
    const userData = loadUserData(username);
    if (userData) {
      const updatedSettings = {
        ...userData.settings,
        games: {
          ...userData.settings?.games,
          forkInTheRoadEnabled: !forkInTheRoadEnabled
        }
      };
      
      saveUserData({
        ...userData,
        settings: updatedSettings
      });
      
      setForkInTheRoadEnabled(!forkInTheRoadEnabled);
    }
  };
  return (
    <Layout username={username} onLogout={handleLogout}>
      <div className="games-hub">
      <div className="games-container">
        <h1 className="games-title">🎮 Game Modes</h1>
        <p className="games-subtitle">
          Different ways to track your escape dreams
        </p>

        <div className="games-grid">
          <Link to="/games/cards" className="game-card">
            <div className="game-icon">🃏</div>
            <h3 className="game-name">Card Drop</h3>
            <p className="game-description">
              Collect random cards with each escape dream. Build your collection!
            </p>
            <span className="game-status available">Available</span>
          </Link>

          <div className="game-card">
            <div className="game-icon">➡️</div>
            <h3 className="game-name">Fork in the Road</h3>
            <p className="game-description">
              Choose the right path! Only one of three buttons will record a successful escape.
            </p>
            <div className="game-toggle-container">
              <label className="game-toggle-label">
                <input
                  type="checkbox"
                  checked={forkInTheRoadEnabled}
                  onChange={handleForkInTheRoadToggle}
                  className="game-toggle"
                />
                <span className="game-toggle-slider"></span>
              </label>
              <span className="game-toggle-text">
                {forkInTheRoadEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>

          <div className="game-card disabled">
            <div className="game-icon">🎰</div>
            <h3 className="game-name">Slot Machine</h3>
            <p className="game-description">
              Spin the slots and win rewards for your escape streaks.
            </p>
            <span className="game-status">Coming Soon</span>
          </div>

          <div className="game-card disabled">
            <div className="game-icon">🏆</div>
            <h3 className="game-name">Achievements</h3>
            <p className="game-description">
              Unlock badges and achievements for hitting milestones.
            </p>
            <span className="game-status">Coming Soon</span>
          </div>

          <div className="game-card disabled">
            <div className="game-icon">⚡</div>
            <h3 className="game-name">Daily Challenges</h3>
            <p className="game-description">
              Complete daily challenges for bonus rewards and streaks.
            </p>
            <span className="game-status">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};
