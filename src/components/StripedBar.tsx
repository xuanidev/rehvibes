import './stripedbar.scss';

interface ProgressBarProps {
  percentage: number;
}

export const StripedBar = (props: ProgressBarProps) => {
  const totalSpans = 5;
  const filledSpans = Math.round((props.percentage / 100) * totalSpans);

  return (
    <div className="progress-bar">
      {[...Array(totalSpans)].map((_, i) => (
        <span key={i} className={i < filledSpans ? 'filled' : ''}></span>
      ))}
    </div>
  );
};

export default StripedBar;
