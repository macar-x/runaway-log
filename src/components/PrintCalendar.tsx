import { useEffect, useRef } from 'react';
import type { HitLog } from '../types';
import { getSavedTimezone, timestampToDateString } from '../timezone';
import './PrintCalendar.css';

interface PrintCalendarProps {
  hits: HitLog[];
  username: string;
  currentMonth: Date;
  onClose: () => void;
  timezone?: string;
}

export const PrintCalendar = ({ hits, username, currentMonth, onClose, timezone: propTimezone }: PrintCalendarProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const timezone = propTimezone || getSavedTimezone();

  useEffect(() => {
    // Add class to body for print styling
    document.body.classList.add('print-mode');

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('print-mode');
    };
  }, [onClose]);

  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay();
    
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Recalculate hit dates based on current timezone
    const hitsByDate = new Map<string, number>();
    hits.forEach(hit => {
      const dateStr = timestampToDateString(hit.timestamp, timezone);
      hitsByDate.set(dateStr, (hitsByDate.get(dateStr) || 0) + 1);
    });
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hitCount = hitsByDate.get(dateStr) || 0;
      
      days.push({
        date: dateStr,
        count: hitCount,
        day: day,
      });
    }
    
    return days;
  };

  const days = getCalendarDays();
  const maxHits = Math.max(...days.filter(d => d !== null).map(d => d!.count), 1);

  const getIntensity = (count: number) => {
    if (count === 0) return 'intensity-0';
    const ratio = count / maxHits;
    if (ratio < 0.25) return 'intensity-1';
    if (ratio < 0.5) return 'intensity-2';
    if (ratio < 0.75) return 'intensity-3';
    return 'intensity-4';
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-overlay" onClick={onClose}>
      <div className="print-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="print-dialog-header">
          <h2>Print Calendar</h2>
          <button onClick={onClose} className="print-close-btn" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="print-preview" ref={printRef}>
          <div className="print-content">
            <div className="print-header">
              <h1 className="print-title">🏃 跑路模擬器</h1>
              <div className="print-user-info">
                <span className="print-username">{username}</span>
                <span className="print-date">{new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>

            <div className="print-calendar-container">
              <h2 className="print-month-title">{monthName}</h2>
              
              <div className="print-calendar-weekdays">
                <div className="print-weekday">Sun</div>
                <div className="print-weekday">Mon</div>
                <div className="print-weekday">Tue</div>
                <div className="print-weekday">Wed</div>
                <div className="print-weekday">Thu</div>
                <div className="print-weekday">Fri</div>
                <div className="print-weekday">Sat</div>
              </div>
              
              <div className="print-calendar-grid">
                {days.map((day, index) => (
                  day === null ? (
                    <div key={index} className="print-calendar-day empty"></div>
                  ) : (
                    <div
                      key={index}
                      className={`print-calendar-day ${getIntensity(day.count)}`}
                    >
                      <span className="print-day-number">{day.day}</span>
                      {day.count > 0 && <span className="print-day-count">{day.count}</span>}
                    </div>
                  )
                ))}
              </div>
              
              <div className="print-calendar-legend">
                <span>Less</span>
                <div className="print-legend-item intensity-0"></div>
                <div className="print-legend-item intensity-1"></div>
                <div className="print-legend-item intensity-2"></div>
                <div className="print-legend-item intensity-3"></div>
                <div className="print-legend-item intensity-4"></div>
                <span>More</span>
              </div>

              <div className="print-stats">
                <div className="print-stat-item">
                  <span className="print-stat-label">Total Escape Dreams:</span>
                  <span className="print-stat-value">{hits.length}</span>
                </div>
                <div className="print-stat-item">
                  <span className="print-stat-label">This Month:</span>
                  <span className="print-stat-value">
                    {days.filter(d => d !== null && d.count > 0).reduce((sum, d) => sum + d!.count, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="print-dialog-actions">
          <div className="print-note">
            💡 Tip: Enable "Background graphics" in print settings for colors
          </div>
          <div className="print-buttons">
            <button onClick={handlePrint} className="print-btn print-action-btn">
              🖨️ Print
            </button>
            <button onClick={onClose} className="cancel-btn print-action-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
