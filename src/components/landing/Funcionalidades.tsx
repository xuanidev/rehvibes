import {
  Funcionalidades_1,
  Funcionalidades_2,
  Funcionalidades_3,
  Funcionalidades_4,
  Funcionalidades_5,
  Funcionalidades_6,
} from '../icons';
import './funcionalidades.scss';

export const Funcionalidades = () => {
  return (
    <section className="funcionalidades_section">
      <h2 className="tittle_h2_funcionalidades">Funcionalidades de la plataforma</h2>
      <p className="text_landing_funcionalidades">
        {' '}
        Con ejercicios personalizados, seguimiento detallado y tele-rehabilitación, te ayudamos a recuperar tu salud de
        manera eficiente.
      </p>
      <div className="icon-text_funcionalidades-section">
        <div className="column_funcionalidades">
          <div className="element_funcionalidades">
            <Funcionalidades_1 className="icon_funcionalidades" />
            <div className="text_funcionalidades">
              <h3>
                Tratamiento de lesiones musculares <span>y de tendones</span>
              </h3>
              <p>Terapias especializadas para sanar y fortalecer tejidos dañados, desde contracturas hasta esguinces</p>
            </div>
          </div>
          <div className="element_funcionalidades">
            <Funcionalidades_2 className="icon_funcionalidades" />
            <div className="text_funcionalidades">
              <h3>
                Alivio de dolores de espalda <span>y neuralgias</span>
              </h3>
              <p>
                Programas personalizados para mejorar la movilidad y aliviar el dolor, abordando causas subyacentes y
                síntomas asociados
              </p>
            </div>
          </div>
          <div className="element_funcionalidades">
            <Funcionalidades_3 className="icon_funcionalidades" />
            <div className="text_funcionalidades">
              <h3>
                Rehabilitación de fracturas <span>y prótesis de rodilla</span>
              </h3>
              <p>Cuidado integral para recuperación ósea y adaptación a prótesis de rodilla</p>
            </div>
          </div>
        </div>
        <div className="column_funcionalidades">
          <div className="element_funcionalidades">
            <Funcionalidades_4 className="icon_funcionalidades" />
            <div className="text_funcionalidades">
              <h3>
                Técnicas de relajación muscular <span>y articular</span>
              </h3>
              <p>
                Métodos para reducir la tensión y mejorar la flexibilidad, desde masajes terapéuticos hasta ejercicios
                guiados
              </p>
            </div>
          </div>
          <div className="element_funcionalidades">
            <Funcionalidades_5 className="icon_funcionalidades" />
            <div className="text_funcionalidades">
              <h3>
                Enfoque completo <span>en la recuperación</span>
              </h3>
              <p>Atención a las necesidades emocionales y psicológicas del paciente durante la rehabilitación</p>
            </div>
          </div>
          <div className="element_funcionalidades">
            <Funcionalidades_6 className="icon_funcionalidades" />
            <div className="text_funcionalidades">
              <h3>
                Planificación de Rehabilitación <span>Personalizada</span>
              </h3>
              <p>
                Diseño de planes de tratamiento adaptados a necesidades individuales para garantizar óptimos resultados
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Funcionalidades;
