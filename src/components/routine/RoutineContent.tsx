import { Exercise } from '../../models';
import './routineContent.scss';
import Esterilla from '../../../public/assets/routinesLibrary/sentadillas.png';
import ExerciseRoutine from './ExercisesRoutine';
import MaterialsContainer from './MaterialsContainer';
import Cuello from '../../assets/cuello.png';
import Trapecios from '../../assets/trapecios.png';

interface RoutineContentProps {
  day: number;
  series?: number;
  materials?: string[];
  exercises: Exercise[];
  srcImg?: string;
  zones?: string[];
}
export const RoutineContent = (props: RoutineContentProps) => {
  const { day, materials = ['Estorilla'], exercises = [], series = 4, srcImg } = props;
  return (
    <div className="routine_content">
      <MaterialsContainer materials={materials} srcImg={srcImg || Esterilla} />
      <ExerciseRoutine exercises={exercises} day={day} series={series} />
      <div className="working_zones">
        <h4 className="routine_content__section_tittle">Lo que vas a trabajar</h4>
        <div className="routine__info_images">
          <img
            src={Cuello}
            alt="Mapa muscular de un cuerpo humano señalando el cuello"
            className="routine__body_img"
          ></img>
          <img
            src={Trapecios}
            alt="Mapa muscular de un cuerpo humano señalando el trapecio"
            className="routine__body_img"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default RoutineContent;
