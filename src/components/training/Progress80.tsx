import './progress.scss';

interface ProgresProps {
  progress: number;
  style?: string;
}

export const Progress80 = (props: ProgresProps) => {
  const { progress, style } = props;

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`progress_circle ${style}`}>
      <svg className="progress-ring" viewBox="0 0 80 80" width="80" height="80">
        <circle
          className="progress-ring-circle"
          stroke="#ffa238"
          strokeWidth="1.5"
          fill="none"
          cx="40"
          cy="40"
          r="36"
        />
        <circle
          className="progress-ring-circle"
          stroke="#ffa238"
          strokeWidth="1.5"
          fill="none"
          cx="40"
          cy="40"
          r="23.5"
        />
        <circle
          className="progress-ring-circle-progress"
          stroke="url(#gradient)"
          strokeWidth="13"
          strokeLinecap="butt"
          fill="none"
          cx="40"
          cy="40"
          r="29.5"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: dashOffset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'all ease-in-out 0.5s',
          }}
        />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="progress_percentage__text">
          {progress}%
        </text>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffa238" />
            <stop offset="100%" stopColor="#ff662d" />
          </linearGradient>
        </defs>
      </svg>
      <h2>
        Progreso <span className="span_training">del</span>
        <span className="span_training"> entrenamiento</span>
      </h2>
    </div>
  );
};

export default Progress80;
