import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { loadUserData, saveUserData } from '../storage';
import { getGravatarUrl, formatMemberSince } from '../utils/gravatar';
import type { UserData } from '../types';
import './Profile.css';

export const Profile = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('runawaylog-username') || '';
  const [userData, setUserData] = useState<UserData | null>(null);
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const handleLogout = () => {
    sessionStorage.removeItem('runawaylog-username');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const data = loadUserData(username);
    if (data) {
      setUserData(data);
      setEmail(data.profile?.email || '');
    }
  }, [username]);

  const handleSaveEmail = () => {
    if (userData) {
      const updatedData: UserData = {
        ...userData,
        profile: {
          ...userData.profile,
          email: email.trim() || undefined,
          registrationDate: userData.profile?.registrationDate || Date.now(),
        },
      };
      saveUserData(updatedData);
      setUserData(updatedData);
      setIsEditing(false);
    }
  };

  if (!userData) {
    return (
      <Layout username={username} onLogout={handleLogout}>
        <div className="profile-loading">Loading...</div>
      </Layout>
    );
  }

  const avatarUrl = getGravatarUrl(userData.profile?.email, 200);
  const registrationDate = userData.profile?.registrationDate || Date.now();
  const memberSince = formatMemberSince(registrationDate);
  const joinDate = new Date(registrationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout username={username} onLogout={handleLogout}>
      <div className="profile-page">
        <div className="profile-container">
          <h1 className="profile-title">👤 User Profile</h1>

          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar-section">
                <img 
                  src={avatarUrl} 
                  alt={`${username}'s avatar`}
                  className="profile-avatar"
                />
                <div className="profile-avatar-hint">
                  {userData.profile?.email ? (
                    <span>Powered by Gravatar</span>
                  ) : (
                    <span>Add email to use Gravatar</span>
                  )}
                </div>
              </div>

              <div className="profile-info">
                <h2 className="profile-username">{username}</h2>
                <div className="profile-stats">
                  <div className="profile-stat">
                    <span className="stat-icon">🏃</span>
                    <span className="stat-value">{userData.hits.length}</span>
                    <span className="stat-label">Escape Dreams</span>
                  </div>
                  <div className="profile-stat">
                    <span className="stat-icon">📅</span>
                    <span className="stat-value">{memberSince}</span>
                    <span className="stat-label">Member For</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-field">
                <label className="field-label">
                  <span className="field-icon">📧</span>
                  Email
                </label>
                {isEditing ? (
                  <div className="field-edit">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="field-input"
                    />
                    <div className="field-actions">
                      <button onClick={handleSaveEmail} className="btn-save">
                        Save
                      </button>
                      <button 
                        onClick={() => {
                          setEmail(userData.profile?.email || '');
                          setIsEditing(false);
                        }} 
                        className="btn-cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="field-display">
                    <span className="field-value">
                      {userData.profile?.email || 'Not set'}
                    </span>
                    <button onClick={() => setIsEditing(true)} className="btn-edit">
                      Edit
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-field">
                <label className="field-label">
                  <span className="field-icon">📆</span>
                  Joined
                </label>
                <div className="field-display">
                  <span className="field-value">{joinDate}</span>
                </div>
              </div>

              <div className="profile-field">
                <label className="field-label">
                  <span className="field-icon">🆔</span>
                  Username
                </label>
                <div className="field-display">
                  <span className="field-value">{username}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-note">
            <p>
              💡 <strong>Tip:</strong> Add your email to get a personalized avatar from{' '}
              <a href="https://gravatar.com" target="_blank" rel="noopener noreferrer">
                Gravatar
              </a>
              . Your email is stored locally and never shared.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
