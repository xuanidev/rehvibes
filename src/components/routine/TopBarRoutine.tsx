import './topBarRoutine.scss';
import profileImg from '../../assets/profileImg.png';
import { LogoWordmarkWhite } from '../branding';
import { AddToFavorites, Share } from '../icons';
import SelectComponent from '../SelectComponent';

interface TopBarRoutineProps {
  user: string;
  selectedOption: { value: string; label: string } | null;
  setSelectedOption: (selectedOption: { value: string; label: string } | null) => void;
}
export const TopBarRoutine = (props: TopBarRoutineProps) => {
  const { user, selectedOption, setSelectedOption } = props;

  return (
    <>
      <div className="routine__top_up">
        <div className="header_routine__top__desktop">
          <span className="header_routine__top_span">Especial para {user}</span>
          <div className="header_routine__top_icons">
            <div className="header_routine__top_icon">
              <Share className="header_routine__top_svg" />
            </div>
            <div className="header_routine__top_icon">
              <AddToFavorites className="header_routine__top_svg" />
            </div>
            <SelectComponent selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
          </div>
        </div>
        <div className="welcome_routine">
          <div className="routine__top_bar__user">
            <img src={profileImg} className="routine__top_bar__img" />
            <div className="routine__top_bar__info">
              <span className="routine__top_bar__name">Vicente Torner</span>
              vtr_91
            </div>
          </div>
          <SelectComponent
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            style="selector_on_top"
          />
          <h2 className="top_bar_tittle">Mi entrenamiento</h2>
          <LogoWordmarkWhite className="routine__wordmark" />
        </div>
      </div>
      <div className="routine__top__bottom">
        <div className="header_routine__top">
          <span className="header_routine__top_span">Especial para {user}</span>
          <div className="header_routine__top_icons">
            <div className="header_routine__top_icon">
              <Share className="header_routine__top_svg" />
            </div>
            <div className="header_routine__top_icon">
              <AddToFavorites className="header_routine__top_svg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBarRoutine;
