import './routineInfo.scss';
import { Btn } from './index.js';
import { Level, Calendar as CalendarIcon, Time, Human } from '../components/icons';
import { useNavigate } from 'react-router-dom';

interface RoutineInfo {
  description: string;
  difficulty: string;
  totalTimeWeeks: string;
  totalTimeHours: string;
  mainAreas: string[];
}

interface RoutineContainerProps {
  routineInfo: RoutineInfo;
}

export const RoutineContainer = (props: RoutineContainerProps) => {
  const navigate = useNavigate();
  const { routineInfo } = props;
  return (
    <div className="routine__container">
      <div className="routine__info">
        <div>
          <h2>Continúa con tu entrenamiento</h2>
          <p>
            <span>Descripción:</span> {routineInfo.description}
          </p>
        </div>
        <ul className="routine__stats">
          <li className="stat">
            <Level width={20} fill="white" />
            <span className="stat__text">{routineInfo.difficulty}</span>
          </li>
          <li className="stat">
            <CalendarIcon width={20} fill="white" />
            <span className="stat__text">{routineInfo.totalTimeWeeks} semanas</span>
          </li>
          <li className="stat">
            <Time width={20} fill="white" />
            <span className="stat__text">{routineInfo.totalTimeHours} horas</span>
          </li>
          <li className="stat">
            <Human width={20} />
            <span className="stat__text">{routineInfo.mainAreas.join(', ')}</span>
          </li>
        </ul>
      </div>
      <div className="separation_line"></div>
      <Btn btnClass="routine_cta" text="Continuar entrenando" onClick={() => navigate('/routine')} />
    </div>
  );
};

export default RoutineContainer;
