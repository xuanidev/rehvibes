import { useNavigate } from 'react-router-dom';
import { LogoWordmark } from '../components/branding';
import ConfigurationOption from '../components/configuration/ConfigurationOption';
import OptionExtended from '../components/configuration/OptionExtended';
import FotoPerfil from '../components/editprofile/FotoPerfil';
import NombreUsuario from '../components/editprofile/NombreUsuario';
import SubmitButtonOption from '../components/editprofile/SubmitButtonOption';

export const EditProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="configuration">
      <div className="configuration__top">
        <h2 className="configuration__top_tittle">Editar mi perfil</h2>
        <LogoWordmark
          className="configuration__top_logo logowordmark_icon_hover_pointer"
          onClick={() => navigate('/')}
        />
      </div>
      <div className="configuration__options">
        <div className="configuration__options_group">
          <ConfigurationOption
            tittle="Nombre de usuario"
            children={
              <>
                <NombreUsuario text="Nombre de usuario" />
                <SubmitButtonOption />
              </>
            }
          />
          <ConfigurationOption
            tittle="Foto de perfil"
            children={
              <>
                <FotoPerfil text="Nueva foto de perfil" />
                <OptionExtended text="Subir una foto de perfil" type="button" textButton="Subir foto" />
                <SubmitButtonOption />
              </>
            }
          />
        </div>
        <div className="configuration__options_group">
          <ConfigurationOption
            tittle="Añadir informes médicos"
            text="Sube tus informes médicos para que la IA de Revibes los analice y diseñe rutinas de rehabilitación personalizadas, adaptadas a tu estado físico y tus necesidades específicas."
            children={
              <>
                <OptionExtended text="Idioma" type="select" textButton="Español" />
              </>
            }
          />
          <ConfigurationOption tittle="Añadir nuevas lesiones" />
        </div>
        <div className="configuration__options_group">
          <ConfigurationOption tittle="Eliminar historial de entrenamiento" />
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
