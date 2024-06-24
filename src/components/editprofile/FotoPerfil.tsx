import './fotoPerfil.scss';
import ProfileImg from '../../assets/profileImg.png';
import Cerdito from '../../assets/Cerdito.png';
import Conejito from '../../assets/Conejito.png';
import Avatar from '../../assets/Avatar.png';
import Trash from '../../assets/Trash.png';

interface FotoPerfilProps {
  text: string;
}

export const FotoPerfil = (props: FotoPerfilProps) => {
  const { text } = props;
  return (
    <div className="profile_photo">
      <div className="profile_photo__content">
        <div className="profile_photo__content_left">
          <p className="profile_photo__text">{text}</p>
          <div className="profile_photo__avatars">
            <img src={ProfileImg} className="profile_photo__avatars_item" />
            <img src={Cerdito} className="profile_photo__avatars_item" />
            <img src={Conejito} className="profile_photo__avatars_item" />
            <img src={Avatar} className="profile_photo__avatars_item" />
            <img src={Trash} className="profile_photo__avatars_item" />
          </div>
        </div>
        <img src={ProfileImg} className="profile_photo__content_img" />
      </div>
    </div>
  );
};
export default FotoPerfil;
