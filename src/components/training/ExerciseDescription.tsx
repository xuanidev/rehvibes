import { Type } from '../icons';
import Progress110 from './Progress110';
import Progress80 from './Progress80';

import './exerciseDescription.scss';

interface ExerciseDescriptionProps {
  type: string;
  maxReps: string;
  minReps: string;
  series: string;
  progress: number;
}

export const ExerciseDescription = (props: ExerciseDescriptionProps) => {
  const { type, maxReps, minReps, series, progress } = props;
  return (
    <div className="exercise_description">
      <Progress80 progress={progress} style="exercise_description__progress" />
      <Progress110 progress={progress} style="exercise_description__progress_xl" />
      <div className="exercise_description__info">
        <div className="exercise_description__top">
          <Type className="exercise_description__top_icon" />
          <h3 className="exercise_description__top_type">Ejercicio de {type}</h3>
        </div>

        <div className="exercise_description__data">
          <div className="exercise_description__data_item">
            {minReps} / {maxReps} repeticiones
          </div>
          <div className="exercise_description__data_item">{series}x series</div>
        </div>
      </div>
    </div>
  );
};
export default ExerciseDescription;
