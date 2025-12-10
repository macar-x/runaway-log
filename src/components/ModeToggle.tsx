import { useMode } from '../contexts/ModeContext';
import './ModeToggle.css';

export const ModeToggle = () => {
  useMode();

  return (
    <button
      className="mode-toggle-button disabled"
      aria-label="Currently in Pro mode"
      title="Currently in Pro mode"
      disabled
    >
      <span className="mode-icon">⭐</span>
      <span className="mode-text">Pro</span>
      <div className="mode-toggle-switch active">
        <div className="mode-toggle-slider" />
      </div>
    </button>
  );
};
