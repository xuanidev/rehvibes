import './achievements.scss';
import { Clock, Medal, Trophy } from './icons';

interface AchievementsProps {
  hours: string;
  sesions: string;
  achievements: string;
}

export const Achievements = (props: AchievementsProps) => {
  const { hours, sesions, achievements } = props;
  return (
    <table className="achievements">
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
      <tr className="achievements__value">
        <td>{hours}</td>
        <td>{sesions}</td>
        <td>{achievements}</td>
      </tr>
      <tr className="achievements__description">
        <td>Horas rehabilitándote</td>
        <td>Sesiones completadas</td>
        <td>Logros Alcanzados</td>
      </tr>
    </table>
  );
};

export default Achievements;
