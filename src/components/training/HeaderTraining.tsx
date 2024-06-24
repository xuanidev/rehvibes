import './headerTraining.scss';
import { LogoWordmarkWhite } from '../branding';
import profileImg from '../../assets/profileImg.png';
import { useNavigate } from 'react-router-dom';

interface HeaderTrainingProps {
  user: string;
}
export const HeaderTraining = (props: HeaderTrainingProps) => {
  const navigate = useNavigate();
  const { user } = props;

  return (
    <div className="header_training">
      <div className="header_training_right">
        <div className="training__top_bar__user" onClick={() => navigate('/profile')}>
          <img src={profileImg} className="training__top_bar__img" />
          <div className="top_bar__info">
            <span className="training__top_bar__name">Vicente Torner</span>
            vtr_91
          </div>
        </div>
        <div className="header_training__buttons">
          <span className="header_training__buttons_span">Especial para {user}</span>
        </div>
      </div>
      <LogoWordmarkWhite className="wordmark" />
    </div>
  );
};

export default HeaderTraining;
