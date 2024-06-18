import './exercisesRoutine.scss';
import { Exercise } from '../../models';
import { FindReplace } from '../icons';
import Sentadillas from '../../../public/assets/routinesLibrary/sentadillas.png';

interface ExerciseRoutineProps {
  day: number;
  exercises: Exercise[];
  series: number;
}
export const ExerciseRoutine = (props: ExerciseRoutineProps) => {
  const { day, exercises, series = 4 } = props;
  return (
    <div className={`exercises_routine ${exercises.length === 0 ? 'display_none' : ''}`}>
      <h4 className="exercises_routine__section_tittle">Lo que vas a hacer</h4>
      <div className="exercises_routine__name">
        <h3>Circuito {day}</h3>
        <span>x{series}</span>
      </div>
      <ul className="exercises_routine__list">
        {exercises.map((exercise: Exercise) => {
          return (
            <li className="exercises_routine__item" key={exercise.name}>
              <img src={Sentadillas} className="item_img" />
              <div className="item_info">
                <div className="item_name">
                  <h4>{exercise.name}</h4>
                  <p>30 s</p>
                </div>
                <div className="item_replace">
                  <FindReplace className="icon_replace" />
                  <p>Reemplazar</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExerciseRoutine;
