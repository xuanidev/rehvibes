import './headerRoutine.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContextProvider';
import TopBarRoutine from './TopBarRoutine';
import InfoRoutine from './InfoRoutine';
import { getFromCookies } from '../../utils/helpers';

interface HeaderRoutineProps {
  mins: string;
  types?: string[];
  selectedOption: { value: string; label: string } | null;
  setSelectedOption: (selectedOption: { value: string; label: string } | null) => void;
}
export const HeaderRoutine = (props: HeaderRoutineProps) => {
  const { mins = 30, types = [], selectedOption, setSelectedOption } = props;
  const { username } = useContext(UserContext);
  const usernameRoutine = username ? username : getFromCookies('username');
  return (
    <section className="header_routine">
      <TopBarRoutine
        user={usernameRoutine}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      ></TopBarRoutine>
      <InfoRoutine level="Intermedio" mins={mins.toString()} types={types} />
    </section>
  );
};

export default HeaderRoutine;
