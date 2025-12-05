import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import type { HitLog } from '../types';
import { getSavedTimezone, formatDateInTimezone } from '../timezone';
import './HitLogs.css';

interface HitLogsProps {
  hits: HitLog[];
  timezone?: string;
}

export const HitLogs = ({ hits, timezone: propTimezone }: HitLogsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timezone = propTimezone || getSavedTimezone();

  useEffect(() => {
    if (containerRef.current) {
      const logs = containerRef.current.querySelectorAll('.log-item');
      animate(logs, {
        opacity: [0, 1],
        translateX: [-20, 0],
        delay: stagger(50),
        duration: 400,
        ease: 'out(3)',
      });
    }
  }, [hits]);

  const formatTime = (timestamp: number) => {
    return formatDateInTimezone(timestamp, timezone);
  };

  // Show most recent hits first
  const sortedHits = [...hits].sort((a, b) => b.timestamp - a.timestamp);
  const recentHits = sortedHits.slice(0, 50); // Show last 50 hits

  return (
    <div className="logs-container" ref={containerRef}>
      <h3 className="logs-title">
        Escape Dreams Log
        {hits.length > 50 && (
          <span className="logs-subtitle"> (Showing last 50 of {hits.length})</span>
        )}
      </h3>
      <div className="logs-list">
        {recentHits.map((hit, index) => (
          <div key={hit.id} className="log-item">
            <span className="log-number">#{sortedHits.length - index}</span>
            <span className="log-time">{formatTime(hit.timestamp)}</span>
            <span className="log-icon">🏃</span>
          </div>
        ))}
      </div>
    </div>
  );
};
