import './achievements.scss';
import { Clock, Medal, Trophy } from './icons';

interface AchievementsProps {
  hours: number;
  sessions: number;
  achievements: number;
}

export const Achievements = (props: AchievementsProps) => {
  const { hours, sessions, achievements } = props;
  return (
    <table className="achievements">
      <thead>
        <tr className="achievements__icons">
          <th>
            <span>
              <Clock width={36} height={36} />
            </span>
          </th>
          <th>
            <span>
              <Medal width={36} height={36} />
            </span>
          </th>
          <th>
            <span>
              <Trophy width={36} height={36} />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="achievements__value">
          <td>{hours}</td>
          <td>{sessions}</td>
          <td>{achievements}</td>
        </tr>
        <tr className="achievements__description">
          <td>Horas rehabilitándote</td>
          <td>Sesiones completadas</td>
          <td>Logros Alcanzados</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Achievements;
