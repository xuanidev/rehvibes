import './headerTraining.scss';
import { LogoWordmarkWhite } from '../branding';
import { AddToFavorites, Share } from '../icons';
import profileImg from '../../assets/profileImg.png';

interface HeaderTrainingProps {
  user: string;
}
export const HeaderTraining = (props: HeaderTrainingProps) => {
  const { user } = props;

  return (
    <div className="header_training">
      <div className="top_bar__user">
        <img src={profileImg} className="top_bar__img" />
        <div className="top_bar__info">
          <span className="top_bar__name">Vicente Torner</span>
          vtr_91
        </div>
      </div>
      <div className="header_training_right">
        <LogoWordmarkWhite className="wordmark" />
        <div className="header_training__buttons">
          <span className="header_training__buttons_span">Especial para {user}</span>
          <div className="header_training__buttons_icons">
            <div className="header_training__buttons_icon">
              <Share className="header_training__buttons_svg" />
            </div>
            <div className="header_training__buttons_icon">
              <AddToFavorites className="header_training__buttons_svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTraining;
