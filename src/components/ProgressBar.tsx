import { useEffect, useState } from 'react';
import './progressBar.scss';

export const ProgressBar = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const initialProgress = Math.floor(Math.random() * 101);
    setProgress(initialProgress);
  }, []);

  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-container">
      <h2>Progreso actual</h2>
      <div className="progress-circle">
        <svg className="progress-ring" width="150" height="150">
          <circle
            className="progress-ring-circle"
            stroke="#ffa238"
            strokeWidth="0.75"
            fill="none"
            cx="75"
            cy="75"
            r="60"
          />
          <circle
            className="progress-ring-circle"
            stroke="#ffa238"
            strokeWidth="0.75"
            fill="none"
            cx="75"
            cy="75"
            r="37.5"
          />
          <circle
            className="progress-ring-circle-progress"
            stroke="url(#gradient)"
            strokeWidth="22.5"
            strokeLinecap="butt"
            fill="none"
            cx="75"
            cy="75"
            r="48.75"
            style={{
              strokeDasharray: circumference * 0.75,
              strokeDashoffset: dashOffset * 0.75,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="progress-percentage">
            {progress}%
          </text>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#ffa238" />
            <stop offset="100%" stopColor="#ff662d" />
          </linearGradient>
        </svg>
      </div>
    </div>
  );
};

export default ProgressBar;
