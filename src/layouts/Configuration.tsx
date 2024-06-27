import { useNavigate } from 'react-router-dom';
import { LogoWordmark } from '../components/branding';
import ConfigurationOption from '../components/configuration/ConfigurationOption';
import OptionExtended from '../components/configuration/OptionExtended';

export const Configuration = () => {
  const navigate = useNavigate();
  return (
    <div className="configuration">
      <div className="configuration__top">
        <h2 className="configuration__top_tittle">Configuración</h2>
        <LogoWordmark
          className="configuration__top_logo logowordmark_icon_hover_pointer"
          onClick={() => navigate('/')}
        />
      </div>
      <div className="configuration__options">
        <div className="configuration__options_group">
          <ConfigurationOption
            tittle="Notificaciones"
            text="Activa las notificaciones para recibir recordatorios de tus sesiones, consejos personalizados y actualizaciones importantes de Revibes. ¡Mantén tu rehabilitación en marcha y sin interrupciones!"
            children={
              <>
                <OptionExtended text="Permitir notificaciones" type="switch" />
                <OptionExtended text="Recordatorio de entrenamiento" type="switch" />
                <OptionExtended text="Notificaciones de programa" type="switch" />
                <OptionExtended text="Tamaño de texto" type="button" textButton="Normal" />
              </>
            }
          />
          <ConfigurationOption
            tittle="Accesibilidad"
            text="Personaliza Revibes para adaptarlo a tus necesidades. Ajusta el tamaño de texto, activa el modo de alto contraste y más opciones para mejorar tu experiencia de uso."
            children={
              <>
                <OptionExtended text="Permitir notificaciones" type="switch" />
                <OptionExtended text="Modo alto contraste" type="switchOff" />
                <OptionExtended text="Control por voz" type="switchOff" />
                <OptionExtended text="Descripciones" type="switchOff" />
              </>
            }
          />
        </div>
        <div className="configuration__options_group">
          <ConfigurationOption
            tittle="Idioma y región"
            children={
              <>
                <OptionExtended text="Idioma" type="select" textButton="Español" />
                <OptionExtended text="Región" type="select" textButton="España" />
              </>
            }
          />
          <ConfigurationOption
            tittle="Unidades de medida"
            text="Activa las notificaciones para recibir recordatorios de tus sesiones, consejos personalizados y actualizaciones importantes de Revibes. ¡Mantén tu rehabilitación en marcha y sin interrupciones!"
          />
          <ConfigurationOption
            tittle="Información del entrenamiento"
            text="Activa las notificaciones para recibir recordatorios de tus sesiones, consejos personalizados y actualizaciones importantes de Revibes. ¡Mantén tu rehabilitación en marcha y sin interrupciones!"
          />
        </div>
        <div className="configuration__options_group">
          <ConfigurationOption
            tittle="Mi subscripción"
            text="Activa las notificaciones para recibir recordatorios de tus sesiones, consejos personalizados y actualizaciones importantes de Revibes. ¡Mantén tu rehabilitación en marcha y sin interrupciones!"
          />
        </div>
        <div className="configuration__options_group">
          <ConfigurationOption
            tittle="Acerca de esta versión"
            text="Activa las notificaciones para recibir recordatorios de tus sesiones, consejos personalizados y actualizaciones importantes de Revibes. ¡Mantén tu rehabilitación en marcha y sin interrupciones!"
          />
          <ConfigurationOption
            tittle="Términos de uso"
            text="Activa las notificaciones para recibir recordatorios de tus sesiones, consejos personalizados y actualizaciones importantes de Revibes. ¡Mantén tu rehabilitación en marcha y sin interrupciones!"
          />
          <ConfigurationOption
            tittle="Política de privacidad"
            text="Activa las notificaciones para recibir recordatorios de tus sesiones, consejos personalizados y actualizaciones importantes de Revibes. ¡Mantén tu rehabilitación en marcha y sin interrupciones!"
          />
        </div>
        <div className="configuration__options_group">
          <ConfigurationOption
            tittle="Preguntas frecuentes"
            text="Activa las notificaciones para recibir recordatorios de tus sesiones, consejos personalizados y actualizaciones importantes de Revibes. ¡Mantén tu rehabilitación en marcha y sin interrupciones!"
          />
          <ConfigurationOption
            tittle="Contacta con nosotros"
            text="Activa las notificaciones para recibir recordatorios de tus sesiones, consejos personalizados y actualizaciones importantes de Revibes. ¡Mantén tu rehabilitación en marcha y sin interrupciones!"
          />
        </div>
        <div className="configuration__options_group margin_bottom_option">
          <ConfigurationOption
            tittle="Eliminar cuenta"
            text="Activa las notificaciones para recibir recordatorios de tus sesiones, consejos personalizados y actualizaciones importantes de Revibes. ¡Mantén tu rehabilitación en marcha y sin interrupciones!"
          />
        </div>
      </div>
    </div>
  );
};
export default Configuration;
