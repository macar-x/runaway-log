import { useMode } from '../contexts/ModeContext';
import './ModeToggle.css';

export const ModeToggle = () => {
  const { mode, toggleMode } = useMode();

  return (
    <button
      onClick={toggleMode}
      className="mode-toggle-button"
      aria-label={`Switch to ${mode === 'free' ? 'Pro' : 'Free'} mode`}
      title={`Currently in ${mode === 'free' ? 'Free' : 'Pro'} mode`}
    >
      <span className="mode-icon">{mode === 'pro' ? '⭐' : '🆓'}</span>
      <span className="mode-text">{mode === 'pro' ? 'Pro' : 'Free'}</span>
      <div className={`mode-toggle-switch ${mode === 'pro' ? 'active' : ''}`}>
        <div className="mode-toggle-slider" />
      </div>
    </button>
  );
};
