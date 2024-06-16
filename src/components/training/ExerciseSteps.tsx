import './exerciseSteps.scss';

interface ExerciseStepsProps {
  steps: string[];
}
export const ExerciseSteps = ({ steps = [] }: ExerciseStepsProps) => {
  return (
    <div className="exercises_step">
      <h3 className="steps_tittle">Pasos:</h3>
      <div className="exercise_steps__steps">
        <ul className="exercise_steps__steps_list">
          {steps.map((step: string, index: number) => {
            return (
              <li
                className="exercise_steps__steps_item"
                key={step.length > 3 ? step.substring(0, 3) + '_' + index : 'step' + '_' + index}
              >
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExerciseSteps;
