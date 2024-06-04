import './topBar.scss';
import AddWorkoutBtn from './AddWorkoutBtn';
import BtnNtf from './BtnNtf';
import { Greet } from './WelcomeMsg';
import { LogoWordmark } from './branding';
import profileImg from '../assets/profileImg.png';

interface TopBarProps {
  uid: string;
  user: string;
}
export const TopBar = (props: TopBarProps) => {
  const { user, uid } = props;
  const greetingUser = Greet(user);

  return (
    <div className="top_up">
      <div className="welcome">
        <div className="top_bar__user">
          <img src={profileImg} className="top_bar__img" />
          <div className="top_bar__info">
            <span className="top_bar__name">Vicente Torner</span>
            vtr_91
          </div>
        </div>
        <div className="top_bar__greeting">{greetingUser}</div>
        <BtnNtf userId={uid} />
        <AddWorkoutBtn id={'workout'} />
      </div>
      <div className="logo">
        <LogoWordmark width={180} />
      </div>
    </div>
  );
};

export default TopBar;
