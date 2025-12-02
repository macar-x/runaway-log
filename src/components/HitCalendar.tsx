import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import type { HitLog } from '../types';
import './HitCalendar.css';

interface HitCalendarProps {
  hits: HitLog[];
}

export const HitCalendar = ({ hits }: HitCalendarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (containerRef.current) {
      const days = containerRef.current.querySelectorAll('.calendar-day');
      animate(days, {
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: stagger(10),
        duration: 300,
        ease: 'out(3)',
      });
    }
  }, [hits, currentMonth]);

  // Get calendar days for current month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday
    
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      const hitCount = hits.filter(hit => hit.date === dateStr).length;
      
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

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getIntensity = (count: number) => {
    if (count === 0) return 'intensity-0';
    const ratio = count / maxHits;
    if (ratio < 0.25) return 'intensity-1';
    if (ratio < 0.5) return 'intensity-2';
    if (ratio < 0.75) return 'intensity-3';
    return 'intensity-4';
  };

  return (
    <div className="calendar-container" ref={containerRef}>
      <div className="calendar-header">
        <button onClick={goToPreviousMonth} className="calendar-nav-btn">←</button>
        <h3 className="calendar-title">{monthName}</h3>
        <button onClick={goToNextMonth} className="calendar-nav-btn">→</button>
      </div>
      <button onClick={goToToday} className="calendar-today-btn">Today</button>
      
      <div className="calendar-weekdays">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
      </div>
      
      <div className="calendar-grid">
        {days.map((day, index) => (
          day === null ? (
            <div key={index} className="calendar-day empty"></div>
          ) : (
            <div
              key={index}
              className={`calendar-day ${getIntensity(day.count)}`}
              title={`${day.date}: ${day.count} escape dream${day.count !== 1 ? 's' : ''}`}
            >
              <span className="day-number">{day.day}</span>
              {day.count > 0 && <span className="day-count">{day.count}</span>}
            </div>
          )
        ))}
      </div>
      
      <div className="calendar-legend">
        <span>Less</span>
        <div className="legend-item intensity-0"></div>
        <div className="legend-item intensity-1"></div>
        <div className="legend-item intensity-2"></div>
        <div className="legend-item intensity-3"></div>
        <div className="legend-item intensity-4"></div>
        <span>More</span>
      </div>
    </div>
  );
};
