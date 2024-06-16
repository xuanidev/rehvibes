import './exerciseInfo.scss';
import { Exercise } from '../../models';
import ExerciseDescription from './ExerciseDescription';
import ExerciseSteps from './ExerciseSteps';
import { ExerciseWarning } from './ExerciseWarning';
import ExerciseActions from './ExercisesActions';

interface ExerciseInfoProps {
  exercise: Exercise;
  prevStep: () => void;
  nextStep: () => void;
  currentStep: number;
  length: number;
  progress: number;
}

export const ExerciseInfo = (props: ExerciseInfoProps) => {
  const { exercise, prevStep, nextStep, length, currentStep, progress } = props;
  return (
    <div className="exercise_info">
      <div className="exercise_info__top">
        <ExerciseDescription
          maxReps={exercise.maxRep ? exercise.maxRep.toString() : ''}
          minReps={exercise.minRep ? exercise.minRep.toString() : ''}
          series={exercise.series ? exercise.series.toString() : ''}
          type={exercise.type}
          progress={progress}
        />
        <ExerciseActions currentExercise={currentStep} length={length} prevStep={prevStep} nextStep={nextStep} />
      </div>
      <div className="exercise_info__bottom">
        <ExerciseSteps steps={exercise.instructions} />
        {exercise.precautions ? <ExerciseWarning text={exercise.precautions} /> : null}
      </div>
    </div>
  );
};
export default ExerciseInfo;
