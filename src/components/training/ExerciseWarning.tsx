import './exerciseWarning.scss';
import { Alert } from '../icons';

interface ExerciseWarningProps {
  text: string;
}

export const ExerciseWarning = ({ text }: ExerciseWarningProps) => {
  return (
    <div className="exercise_warning">
      <Alert className="exercise_warning__icon" />
      <p role="alert" className="exercise_warning__message">
        {text}
      </p>
    </div>
  );
};
