import './caracteristicas.scss';

interface CaracteristicasProps {
  id: string;
}
export const Caracteristicas = ({ id }: CaracteristicasProps) => {
  return (
    <div className="container-caracteristicas">
      <input type="radio" name="tabs" id="tab1" className="radio-tab-caracteristicas" defaultChecked />
      <input type="radio" name="tabs" id="tab2" className="radio-tab-caracteristicas" />
      <input type="radio" name="tabs" id="tab3" className="radio-tab-caracteristicas" />
      <input type="radio" name="tabs" id="tab4" className="radio-tab-caracteristicas" />
      <h2 className="upper_text_caracteristicas" id={id}>
        Cuando te mueves y realizas ejercicio, <span>tu cuerpo mejora y desarrolla:</span>
      </h2>
      <div className="tab-content-caracteristicas content1">
        <div className="content1_shadow">
          <div className="content1_img"></div>
          <span className="content1_span">COORDINACIÓN</span>
        </div>
      </div>
      <div className="tab-content-caracteristicas content2">
        <div className="content2_shadow">
          <div className="content2_img"></div>
          <span className="content2_span">FUERZA</span>
        </div>
      </div>
      <div className="tab-content-caracteristicas content3">
        <div className="content3_shadow">
          <div className="content3_img"></div>
          <span className="content3_span">FLEXIBILIDAD</span>
        </div>
      </div>
      <div className="tab-content-caracteristicas content4">
        <div className="content4_shadow">
          <div className="content4_img"></div>
          <span className="content4_span">RESISTENCIA</span>
        </div>
      </div>

      <div className="tabs-caracteristicas">
        <label htmlFor="tab1" className="tab-title-caracteristicas">
          <h3 className="tabs-caracteristicas_tittle_h3">Coordinación</h3>
          <p>
            Mejora la precisión y el control de los movimientos, fundamental para recuperar habilidades motoras perdidas
            y facilitar la transición a actividades cotidianas.
          </p>
        </label>
        <label htmlFor="tab2" className="tab-title-caracteristicas">
          <h3 className="tabs-caracteristicas_tittle_h3">Fuerza</h3>
          <p>
            Desarrolla la capacidad de ejercer fuerza contra la resistencia, crucial para recuperar la funcionalidad,
            prevenir lesiones y aumentar la independencia física.
          </p>
        </label>
        <label htmlFor="tab3" className="tab-title-caracteristicas">
          <h3 className="tabs-caracteristicas_tittle_h3">Flexibilidad</h3>
          <p>
            Aumenta la amplitud de movimiento de las articulaciones y músculos, esencial para restaurar la movilidad,
            prevenir lesiones y mejorar la postura corporal.
          </p>
        </label>
        <label htmlFor="tab4" className="tab-title-caracteristicas">
          <h3 className="tabs-caracteristicas_tittle_h3">Resistencia</h3>
          <p>
            Incrementa la capacidad de mantener el esfuerzo durante periodos prolongados, vital para mejorar la
            capacidad funcional, la resistencia cardiovascular y la energía diaria.
          </p>
        </label>
      </div>
    </div>
  );
};

export default Caracteristicas;
