import './topLibrary.scss';
import { LogoWordmark } from '../branding';
import BtnFilter from './BtnFilter';
import BtnSearch from './BtnSearch';
import AddWorkoutBtn from '../AddWorkoutBtn';

export const TopLibrary = () => {
  return (
    <>
      <div className="library_top__top">
        <h2 className="library_top__top_tittle">Librería</h2>
        <div className="library_header-btns__top">
          <AddWorkoutBtn />
          <BtnFilter style="search-input" />
          <BtnSearch style="exercise-filter" />
        </div>
        <LogoWordmark className="library_top__logo" />
      </div>
      <div className="library_header__bottom">
        <BtnSearch style="exercise-filter" />
        <BtnFilter style="search-input" />
      </div>
    </>
  );
};
