import { useMemo } from 'react';
import type { HitLog } from '../types';
import { timestampToDateString } from '../timezone';
import './Statistics.css';

interface StatisticsProps {
  hits: HitLog[];
  timezone: string;
}

interface DayStats {
  [key: string]: number;
}

interface HourStats {
  [key: number]: number;
}

export const Statistics = ({ hits, timezone }: StatisticsProps) => {
  const stats = useMemo(() => {
    if (hits.length === 0) {
      return {
        total: 0,
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        longestStreak: 0,
        currentStreak: 0,
        averagePerDay: 0,
        mostActiveDay: '',
        mostActiveHour: '',
        peakDay: '',
        peakCount: 0,
      };
    }

    const now = Date.now();
    const todayStr = timestampToDateString(now, timezone);
    
    // Calculate date boundaries
    const startOfWeek = new Date(now);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const startOfMonth = new Date(now);
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Count hits by period
    let today = 0;
    let thisWeek = 0;
    let thisMonth = 0;

    hits.forEach(hit => {
      if (hit.date === todayStr) today++;
      if (hit.timestamp >= startOfWeek.getTime()) thisWeek++;
      if (hit.timestamp >= startOfMonth.getTime()) thisMonth++;
    });

    // Calculate streaks
    const sortedHits = [...hits].sort((a, b) => b.timestamp - a.timestamp);
    const uniqueDates = Array.from(new Set(sortedHits.map(h => h.date))).sort().reverse();
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const currentDate = new Date(uniqueDates[i]);
      
      if (i === 0) {
        const today = new Date(todayStr);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (uniqueDates[i] === todayStr || uniqueDates[i] === yesterday.toISOString().split('T')[0]) {
          currentStreak = 1;
          tempStreak = 1;
        }
      } else {
        const prevDate = new Date(uniqueDates[i - 1]);
        const dayDiff = Math.floor((prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
          tempStreak++;
          if (i === 1 || currentStreak > 0) {
            currentStreak = tempStreak;
          }
        } else {
          tempStreak = 1;
        }
      }
      
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    // Calculate average per day
    const firstHit = hits[0];
    const daysSinceFirst = Math.max(1, Math.ceil((now - firstHit.timestamp) / (1000 * 60 * 60 * 24)));
    const averagePerDay = hits.length / daysSinceFirst;

    // Most active day of week
    const dayStats: DayStats = {};
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    hits.forEach(hit => {
      const date = new Date(hit.timestamp);
      const dayName = dayNames[date.getDay()];
      dayStats[dayName] = (dayStats[dayName] || 0) + 1;
    });
    
    const mostActiveDay = Object.entries(dayStats).reduce((a, b) => 
      b[1] > a[1] ? b : a, ['', 0]
    )[0];

    // Most active hour
    const hourStats: HourStats = {};
    
    hits.forEach(hit => {
      const date = new Date(hit.timestamp);
      const hour = date.getHours();
      hourStats[hour] = (hourStats[hour] || 0) + 1;
    });
    
    const mostActiveHourNum = Object.entries(hourStats).reduce((a, b) => 
      b[1] > a[1] ? b : a, ['0', 0]
    )[0];
    
    const mostActiveHour = `${mostActiveHourNum}:00 - ${parseInt(mostActiveHourNum) + 1}:00`;

    // Peak day (most hits in a single day)
    const dateStats: DayStats = {};
    
    hits.forEach(hit => {
      dateStats[hit.date] = (dateStats[hit.date] || 0) + 1;
    });
    
    const [peakDay, peakCount] = Object.entries(dateStats).reduce((a, b) => 
      b[1] > a[1] ? b : a, ['', 0]
    );

    return {
      total: hits.length,
      today,
      thisWeek,
      thisMonth,
      longestStreak,
      currentStreak,
      averagePerDay: Math.round(averagePerDay * 10) / 10,
      mostActiveDay,
      mostActiveHour,
      peakDay,
      peakCount,
    };
  }, [hits, timezone]);

  return (
    <div className="statistics-container">
      <h3 className="statistics-title">📊 Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Escapes</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.today}</div>
          <div className="stat-label">Today</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.thisWeek}</div>
          <div className="stat-label">This Week</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.thisMonth}</div>
          <div className="stat-label">This Month</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.averagePerDay}</div>
          <div className="stat-label">Avg per Day</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.currentStreak}</div>
          <div className="stat-label">Current Streak</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.longestStreak}</div>
          <div className="stat-label">Longest Streak</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.peakCount}</div>
          <div className="stat-label">Peak Day</div>
        </div>
      </div>

      <div className="stats-insights">
        <div className="insight-item">
          <span className="insight-icon">📅</span>
          <span className="insight-text">
            Most active on <strong>{stats.mostActiveDay || 'N/A'}</strong>
          </span>
        </div>

        <div className="insight-item">
          <span className="insight-icon">🕐</span>
          <span className="insight-text">
            Peak escape time: <strong>{stats.mostActiveHour || 'N/A'}</strong>
          </span>
        </div>

        {stats.peakDay && (
          <div className="insight-item">
            <span className="insight-icon">🔥</span>
            <span className="insight-text">
              Record day: <strong>{stats.peakCount} escapes</strong> on {stats.peakDay}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
