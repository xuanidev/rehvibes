import { LogoWordmark } from '../components/branding';
import { Basic } from '../components/icons/Basic';
import { PremiumIcon } from '../components/icons/Premium';

export const Premium = () => {
  return (
    <div className="premium__container">
      <div className="premium__content">
        <div className="premium__top">
          <h2 className="premium__top_tittle">Premium</h2>
          <LogoWordmark className="configuration__top_logo" />
        </div>
        <div className="premium__main">
          <div className="premium__cta">
            <h3>Escoge el plan que mejor se adapte a tus necesidades</h3>
          </div>
          <div className="premium__plans">
            <div className="premium__plans-data">
              <div className="plan__top">
                <Basic className="basic__icon"></Basic>
                <h3>BÁSICO</h3>
              </div>
              <div className="plan__info">
                <h2>GRATIS</h2>
                <ul>
                  <li>
                    <span>Cuestionario Inicial: </span> Análisis inicial realizado con IA para personalizar tu
                    entrenamiento.
                  </li>
                  <li>
                    <span>Entrenamiento Personalizado: </span> Plan de entrenamiento basado en el análisis del
                    cuestionario.
                  </li>
                  <li>
                    <span>Navegación por Ejercicios: </span> Acceso a la biblioteca de ejercicios de la app.
                  </li>
                  <li>
                    <span>Videos y Descripciones de Ejercicios: </span> Instrucciones y demostraciones de los
                    ejercicios.
                  </li>
                  <li>
                    <span>Progreso Básico: </span> Seguimiento básico de tu progreso.
                  </li>
                  <li>
                    <span>Feedback Limitado: </span> Comentarios básicos sobre tu rendimiento.
                  </li>
                </ul>
                <button className="plan-button">Continuar con mi plan</button>
              </div>
            </div>
            <div className="premium__plans-data">
              <div className="plan__top">
                <PremiumIcon className="premium__icon"></PremiumIcon>
                <h3>PREMIUM</h3>
              </div>
              <div className="plan__info">
                <h2>
                  14,99<span className="date">/mes</span>
                </h2>
                <ul>
                  <li>
                    <span>Cuestionario Inicial:</span> Análisis inicial realizado con IA para personalizar tu
                    entrenamiento.
                  </li>
                  <li>
                    <span>Entrenamiento Personalizado:</span> Plan de entrenamiento basado en el análisis del
                    cuestionario.
                  </li>
                  <li>
                    <span>Navegación por Ejercicios:</span> Acceso a la biblioteca de ejercicios de la app.
                  </li>
                  <li>
                    <span>Videos y Descripciones de Ejercicios:</span> Instrucciones y demostraciones de los ejercicios.
                  </li>
                  <li>
                    <span>Progreso Avanzado:</span> Seguimiento detallado de tu progreso.
                  </li>
                  <li>
                    <span>Feedback Detallado:</span> Comentarios detallados sobre tu rendimiento.
                  </li>
                  <li>
                    <span>Test de Movilidad y Postura:</span> Evaluaciones periódicas para ajustar el plan de
                    entrenamiento.
                  </li>
                  <li>
                    <span>Seguimiento en Tiempo Real:</span> Monitoreo en vivo durante los ejercicios para corregir la
                    postura.
                  </li>
                  <li>
                    <span>Personalización de Entrenamientos:</span> Ajustes y personalización de los entrenamientos
                    basados en preferencias.
                  </li>
                  <li>
                    <span>Consultas con Especialistas:</span> Sesiones periódicas con fisioterapeutas o especialistas en
                    rehabilitación.
                  </li>
                </ul>
                <button className="plan-button">Hacerme premium</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
