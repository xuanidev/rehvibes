import './exercisesActions.scss';

interface ExerciseActionsProps {
  currentExercise: number;
  prevStep: () => void;
  nextStep: () => void;
  length: number;
  handleSubmit: () => void;
}

export const ExerciseActions = (props: ExerciseActionsProps) => {
  const { currentExercise, prevStep, nextStep, length, handleSubmit } = props;

  return (
    <div className="exercise__actions">
      {currentExercise > 0 && (
        <button type="button" className="exercise__btn exercise__btn--back" onClick={prevStep}>
          Ejercicio anterior
        </button>
      )}
      {currentExercise < length - 1 && (
        <button type="button" className="exercise__btn exercise__btn--right" onClick={nextStep}>
          Siguiente ejercicio
        </button>
      )}
      {currentExercise === length - 1 && (
        <button type="submit" className="exercise__btn exercise__btn--right" onClick={handleSubmit}>
          Finalizar rutina
        </button>
      )}
    </div>
  );
};

export default ExerciseActions;
