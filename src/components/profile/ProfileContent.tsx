import './profileContent.scss';
import profileImg from '../../assets/profileImg.png';
import ConfigurationOption from '../configuration/ConfigurationOption';
import OptionExtended from '../configuration/OptionExtended';
import ProfileRoutines from './ProfileRoutines';
import { useNavigate } from 'react-router-dom';

export const ProfileContent = () => {
  const navigate = useNavigate();
  return (
    <div className="profile__content">
      <div className="profile__content__user">
        <img src={profileImg} className="profile__content__img" />
        <div className="profile__content__info">
          <button className="profile__content__name" onClick={() => navigate('/editprofile')}>
            Editar Perfil
          </button>
        </div>
      </div>
      <div className="profile__options_group">
        <ConfigurationOption
          tittle="Sobre mí"
          children={
            <>
              <OptionExtended text="Nombre" type="button" textButton="Editar" leftButtonText="Vicente Torner" />
              <OptionExtended
                text="Fecha de nacimiento"
                type="button"
                textButton="Editar"
                leftButtonText="23/06/1991"
              />
              <OptionExtended text="Peso" type="button" textButton="Editar" leftButtonText="80kg" />
              <OptionExtended text="Estatura" type="button" textButton="Editar" leftButtonText="185cms" />
            </>
          }
        />
        <ConfigurationOption
          tittle="Correo electrónico"
          children={
            <>
              <OptionExtended text="Correo" type="button" textButton="Editar" leftButtonText="revibes@gmail.com" />
            </>
          }
        />
      </div>
      <ProfileRoutines />
    </div>
  );
};
export default ProfileContent;
