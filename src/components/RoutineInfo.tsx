import React from 'react';
import './routineInfo.scss';
import { Btn } from './index.js';

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

export const RoutineContainer: React.FC<RoutineContainerProps> = ({ routineInfo }) => {
  return (
    <div className="routine-container">
      <div className="routine-info">
        <div>
          <h2>Continúa con tu entrenamiento</h2>
          <p>Descripción: {routineInfo.description}</p>
        </div>
        <ul className="routine-stats">
          <li>
            <span className="icon-difficulty">{routineInfo.difficulty}</span>
          </li>
          <li>
            <span className="icon-total-time-weeks">{routineInfo.totalTimeWeeks} semanas</span>
          </li>
          <li>
            <span className="icon-total-time-hours">{routineInfo.totalTimeHours} horas</span>
          </li>
          <li>
            <span className="icon-main-areas">{routineInfo.mainAreas.join(', ')}</span>
          </li>
        </ul>
      </div>
      <div className="separation-line"></div>
      <Btn
        btnClass="primary"
        text="Continuar entrenando"
        //   onClick=
      />
    </div>
  );
};

export default RoutineContainer;
