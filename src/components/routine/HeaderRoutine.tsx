import './headerRoutine.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContextProvider';
import TopBarRoutine from './TopBarRoutine';
import InfoRoutine from './InfoRoutine';

interface HeaderRoutineProps {
  mins: string;
  types?: string[];
}
export const HeaderRoutine = (props: HeaderRoutineProps) => {
  const { mins = 30, types = [] } = props;
  const { username } = useContext(UserContext);
  return (
    <section className="header_routine">
      <TopBarRoutine user={username || ''}></TopBarRoutine>
      <InfoRoutine level="Intermedio" mins={mins.toString()} types={types} />
    </section>
  );
};

export default HeaderRoutine;
