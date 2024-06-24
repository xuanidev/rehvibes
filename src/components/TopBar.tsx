import './topBar.scss';
import AddWorkoutBtn from './AddWorkoutBtn';
import BtnNtf from './BtnNtf';
import { Greet } from './WelcomeMsg';
import profileImg from '../assets/profileImg.png';
import { LogoWordmark } from './branding';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  uid: string;
  user: string;
}
export const TopBar = (props: TopBarProps) => {
  const navigate = useNavigate();
  const { user, uid } = props;
  const greetingUser = Greet(user);

  return (
    <>
      <div className="top_up">
        <div className="welcome">
          <div className="welcome__left">
            <div className="top_bar__user" onClick={() => navigate('/profile')}>
              <img src={profileImg} className="top_bar__img" />
              <div className="top_bar__info">
                <span className="top_bar__name">Vicente Torner</span>
                vtr_91
              </div>
            </div>
            <div className="top_bar__greeting__desktop">{greetingUser}</div>
          </div>
          <BtnNtf userId={uid} style="ntf_btn__desktop" />
          <AddWorkoutBtn style="workout_btn__desktop" />
        </div>
        <LogoWordmark className="wordmark" />
      </div>
      <div className="top__bottom">
        <div className="welcome__bottom">
          <div className="top_bar__greeting">{greetingUser}</div>
          <div className="top_bar__icons">
            <BtnNtf userId={uid} style="ntf_btn" />
            <AddWorkoutBtn style="workout_btn" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
