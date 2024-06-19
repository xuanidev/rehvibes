import { Exercise } from '../../models';
import './routineContent.scss';
import Esterilla from '../../../public/assets/routinesLibrary/sentadillas.png';
import ExerciseRoutine from './ExercisesRoutine';
import MaterialsContainer from './MaterialsContainer';
import BodyMap from '../BodyMap';

interface RoutineContentProps {
  day: number;
  series?: number;
  materials?: string[];
  exercises: Exercise[];
  srcImg?: string;
  zones?: string[];
}
export const RoutineContent = (props: RoutineContentProps) => {
  const { day, materials = ['Estorilla'], exercises = [], series = 4, srcImg, zones = ['Cuello'] } = props;
  return (
    <div className="routine_content">
      <MaterialsContainer materials={materials} srcImg={srcImg || Esterilla} />
      <ExerciseRoutine exercises={exercises} day={day} series={series} />
      <div className="working_zones">
        <h4 className="routine_content__section_tittle">Lo que vas a trabajar</h4>
        <BodyMap zones={zones} />
      </div>
    </div>
  );
};

export default RoutineContent;
