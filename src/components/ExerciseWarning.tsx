import './exerciseWarning.scss';
import { Alert } from './icons';

interface ExerciseWarningProps {
  text: string;
  style?: string;
}

export const ExerciseWarning = (props: ExerciseWarningProps) => {
  const { text, style } = props;
  return (
    <div className={`exercise_warning ${style}`}>
      <Alert className="exercise_warning__icon" />
      <p role="alert" className="exercise_warning__message">
        {text}
      </p>
    </div>
  );
};
