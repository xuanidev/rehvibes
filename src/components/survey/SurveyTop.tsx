import { Information } from '../icons';

interface SurveyTopProps {
  percentage: number[];
}

export const SurveyTop = ({ percentage }: SurveyTopProps) => {
  return (
    <div className="survey__top">
      <div className="progress_bar_container">
        <div className="progress_bar__bar" style={{ width: `${percentage[0]}%` }}></div>
      </div>
      <div className="progress_bar_container">
        <div className="progress_bar__bar" style={{ width: `${percentage[1]}%` }}></div>
      </div>
      <div className="progress_bar_container">
        <div className="progress_bar__bar" style={{ width: `${percentage[2]}%` }}></div>
      </div>
      <div className="information_icon">
        <Information fill="white" height={25} width={25} />
      </div>
    </div>
  );
};

export default SurveyTop;
