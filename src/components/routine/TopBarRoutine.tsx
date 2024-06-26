import './topBarRoutine.scss'; // Ensure your SCSS file path is correct
import profileImg from '../../assets/profileImg.png';
import { LogoWordmarkWhite } from '../branding';
import { AddToFavorites, Share } from '../icons';
import SelectComponent from '../SelectComponent';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastError, toastDefault } from '../../constants';
import classNames from 'classnames';
import { useState } from 'react';

interface TopBarRoutineProps {
  user: string;
  selectedOption: { value: string; label: string } | null;
  setSelectedOption: (selectedOption: { value: string; label: string } | null) => void;
}

export const TopBarRoutine = (props: TopBarRoutineProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, selectedOption, setSelectedOption } = props;

  const handleShareClick = () => {
    console.log('Share clicked'); // Check if this log appears in the console
    const urls = 'https://www.revibes.netlify.app/';
    navigator.clipboard
      .writeText(urls)
      .then(() => {
        toast.success('Copiado correctamente', toastDefault);
      })
      .catch(() => {
        toast.error('Failed to copy', toastError);
      });
  };

  return (
    <>
      <div className="routine__top_up">
        <div className="header_routine__top__desktop">
          <span className="header_routine__top_span">Especial para {user}</span>
          <div className="header_routine__top_icons">
            <div className="header_routine__top_icon" onClick={handleShareClick}>
              <Share className="header_routine__top_svg" />
            </div>
            <div
              className={classNames({
                header_routine__top_icon: true,
                header_routine__top_icon__active: isFavorite,
              })}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <AddToFavorites className="header_routine__top_svg" />
            </div>
            <SelectComponent selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
          </div>
        </div>
        <div className="welcome_routine">
          <div className="routine__top_bar__user" onClick={() => navigate('/profile')}>
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
          <LogoWordmarkWhite
            className="routine__wordmark logowordmark_icon_hover_pointer"
            onClick={() => navigate('/')}
          />
          <ToastContainer />
        </div>
      </div>
      <div className="routine__top__bottom">
        <div className="header_routine__top">
          <span className="header_routine__top_span">Especial para {user}</span>
          <div className="header_routine__top_icons">
            <div className="header_routine__top_icon" onClick={handleShareClick}>
              <Share className="header_routine__top_svg" />
            </div>
            <div
              className={classNames({
                header_routine__top_icon: true,
                header_routine__top_icon__active: isFavorite,
              })}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <AddToFavorites className="header_routine__top_svg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBarRoutine;
