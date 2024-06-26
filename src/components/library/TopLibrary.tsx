import './topLibrary.scss';
import { LogoWordmark } from '../branding';
import BtnFilter from './BtnFilter';
import BtnSearch from './BtnSearch';
import { useNavigate } from 'react-router-dom';

export const TopLibrary = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="library_top__top">
        <h2 className="library_top__top_tittle">Librería</h2>
        <div className="library_header-btns__top">
          <BtnSearch style="exercise-filter" />
          <BtnFilter style="search-input" />
        </div>
        <LogoWordmark className="library_top__logo logowordmark_icon_hover_pointer" onClick={() => navigate('/')} />
      </div>
      <div className="library_header__bottom">
        <BtnSearch style="exercise-filter" />
        <BtnFilter style="search-input" />
      </div>
    </>
  );
};
