import './topBarRoutine.scss';
import profileImg from '../../assets/profileImg.png';
import { LogoWordmarkWhite } from '../branding';
import { AddToFavorites, Share } from '../icons';
import { useState } from 'react';

interface TopBarRoutineProps {
  user: string;
}
export const TopBarRoutine = (props: TopBarRoutineProps) => {
  const { user } = props;
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="top_up">
        <div className="header_routine__top__desktop">
          <span className="header_routine__top_span">Especial para {user}</span>
          <div className="header_routine__top_icons">
            <div className="header_routine__top_icon">
              <Share className="header_routine__top_svg" />
            </div>
            <div className="header_routine__top_icon">
              <AddToFavorites className="header_routine__top_svg" />
            </div>
            <select className="header_routine__top_select" value={selectedOption} onChange={handleSelectChange}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
        <div className="welcome_routine">
          <div className="top_bar__user">
            <img src={profileImg} className="top_bar__img" />
            <div className="top_bar__info">
              <span className="top_bar__name">Vicente Torner</span>
              vtr_91
            </div>
          </div>
          <h2 className="top_bar_tittle">Mi entrenamiento</h2>
          <LogoWordmarkWhite className="wordmark" />
        </div>
      </div>
      <div className="top__bottom">
        <div className="header_routine__top">
          <span className="header_routine__top_span">Especial para {user}</span>
          <div className="header_routine__top_icons">
            <div className="header_routine__top_icon">
              <Share className="header_routine__top_svg" />
            </div>
            <div className="header_routine__top_icon">
              <AddToFavorites className="header_routine__top_svg" />
            </div>
            <select className="header_routine__top_select" value={selectedOption} onChange={handleSelectChange}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBarRoutine;
