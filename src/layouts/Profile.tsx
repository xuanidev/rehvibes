import { LogoWordmark } from '../components/branding';
import ProfileContent from '../components/profile/ProfileContent';

export const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__top">
        <h2 className="profile__top_tittle">Configuración</h2>
        <LogoWordmark className="profile__top_logo" />
      </div>
      <ProfileContent />
    </div>
  );
};

export default Profile;
