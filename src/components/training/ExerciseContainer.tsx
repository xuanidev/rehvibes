import './exerciseContainer.scss';
import { Exercise } from '../../models';
import ExerciseFrame from './ExerciseFrame';
import ExerciseInfo from './ExerciseInfo';

interface ExerciseContainerProps {
  exercise: Exercise;
  prevStep: () => void;
  nextStep: () => void;
  currentStep: number;
  length: number;
  progress: number;
  handleSubmit: () => void;
  favorites: number[];
  updateFavorites: (value: number) => void;
}
export const ExerciseContainer = (props: ExerciseContainerProps) => {
  const { exercise, prevStep, nextStep, currentStep, length, progress, handleSubmit, favorites, updateFavorites } =
    props;

  return (
    <div className="exercise_container">
      <ExerciseFrame
        name={exercise.name}
        video={exercise.video}
        currentExerciseId={exercise.id}
        favorites={favorites}
        updateFavorites={updateFavorites}
      />
      <ExerciseInfo
        exercise={exercise}
        prevStep={prevStep}
        nextStep={nextStep}
        currentStep={currentStep}
        length={length}
        progress={progress}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ExerciseContainer;
