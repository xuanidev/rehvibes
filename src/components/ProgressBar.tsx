import React, { useState } from 'react';
import './progressBar.scss';

const ProgressBar: React.FC = () => {
  const initialProgress = Math.floor(Math.random() * 101);
  const [progress, setProgress] = useState<number>(initialProgress);

  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="progress-container">
      <h2>Progreso actual</h2>
      <div className="progress-circle">
        <svg className="progress-ring" width="200" height="200">
          <circle className="progress-ring-circle" stroke="#ffa238" strokeWidth="1" fill="none" cx="100" cy="100" r="80" />
          <circle className="progress-ring-circle" stroke="#ffa238" strokeWidth="1" fill="none" cx="100" cy="100" r="50" />
          <circle
            className="progress-ring-circle-progress"
            stroke="url(#gradient)"
            strokeWidth="30"
            strokeLinecap="butt"
            fill="none"
            cx="100"
            cy="100"
            r="65"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
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
