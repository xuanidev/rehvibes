import './exerciseContainer.scss';
import { Exercise } from '../../models';
import ExerciseFrame from './ExerciseFrame';
import ImgExample from '../../assets/routinesLibrary/aislamiento_triceps.png';
import ExerciseInfo from './ExerciseInfo';

interface ExerciseContainerProps {
  exercise: Exercise;
  prevStep: () => void;
  nextStep: () => void;
  currentStep: number;
  length: number;
  progress: number;
}
export const ExerciseContainer = (props: ExerciseContainerProps) => {
  const { exercise, prevStep, nextStep, currentStep, length, progress } = props;

  return (
    <div className="exercise_container">
      <ExerciseFrame name={exercise.name} img={ImgExample} />
      <ExerciseInfo
        exercise={exercise}
        prevStep={prevStep}
        nextStep={nextStep}
        currentStep={currentStep}
        length={length}
        progress={progress}
      />
    </div>
  );
};

export default ExerciseContainer;
