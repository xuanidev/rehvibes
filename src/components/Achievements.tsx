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
      <tbody>
        <tr className="achievements__value">
          <td>
            <Clock width={36} height={36} /> {hours}
          </td>
          <td>
            <Medal width={36} height={36} /> {sessions}
          </td>
          <td>
            <Trophy width={36} height={36} /> {achievements}
          </td>
        </tr>
      </tbody>
      <thead>
        <tr className="achievements__tittles">
          <th>Horas rehabilitándote</th>
          <th>Sesiones completadas</th>
          <th>Logros Alcanzados</th>
        </tr>
      </thead>
    </table>
  );
};

export default Achievements;
