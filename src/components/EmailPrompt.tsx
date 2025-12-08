import { useState } from 'react';
import './EmailPrompt.css';

interface EmailPromptProps {
  username: string;
  onSave: (email: string) => void;
  onSkip: () => void;
}

export const EmailPrompt = ({ onSave, onSkip }: EmailPromptProps) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSave(email.trim());
    }
  };

  return (
    <div className="email-prompt-overlay">
      <div className="email-prompt-card">
        <div className="email-prompt-icon">⭐</div>
        <h2 className="email-prompt-title">Welcome to Pro Mode!</h2>
        <p className="email-prompt-subtitle">
          Add your email to unlock your personalized avatar
        </p>

        <form onSubmit={handleSubmit} className="email-prompt-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="email-prompt-input"
            autoFocus
          />
          
          <div className="email-prompt-actions">
            <button type="submit" className="email-prompt-btn primary" disabled={!email.trim()}>
              Save Email
            </button>
            <button type="button" onClick={onSkip} className="email-prompt-btn secondary">
              Skip for Now
            </button>
          </div>
        </form>

        <p className="email-prompt-note">
          💡 Your email is stored locally and used only for Gravatar avatar
        </p>
      </div>
    </div>
  );
};
