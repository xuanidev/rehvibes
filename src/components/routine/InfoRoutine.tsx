import './infoRoutine.scss';
import Btn from '../Btn';
import { useNavigate } from 'react-router-dom';

interface InfoRoutineProps {
  mins: string;
  level: string;
  types: string[];
}
export const InfoRoutine = (props: InfoRoutineProps) => {
  const navigate = useNavigate();
  const { mins = 30, level, types } = props;

  return (
    <div className="info_routine">
      <div className="info_routine__left">
        <div className="info_routine__info">
          <p className="info_routine__info_time">{mins} min</p>
          <h3 className="info_routine__info_type">
            {types ? `Entrenamiento de ${types[0]}` : 'Disfruta de tu entrenamiento!'}
          </h3>
        </div>
        <div className="info_routine__h4s">
          <h4 className="info_routine__h4">{level}</h4>
          <h4 className="info_routine__h4">{types.join(' ')}</h4>
        </div>
      </div>
      <Btn text="Empezar ahora" btnClass="routine_cta" onClick={() => navigate('/training')} />
    </div>
  );
};

export default InfoRoutine;
