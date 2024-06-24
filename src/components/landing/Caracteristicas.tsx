import './caracteristicas.scss';

export const Caracteristicas = () => {
    return (

        
    <div className="container-caracteristicas">
    <input type="radio" name="tabs" id="tab1" className="radio-tab-caracteristicas" checked/>
    <input type="radio" name="tabs" id="tab2" className="radio-tab-caracteristicas"/>
    <input type="radio" name="tabs" id="tab3" className="radio-tab-caracteristicas"/>
    <input type="radio" name="tabs" id="tab4" className="radio-tab-caracteristicas"/>

    <div className="tab-content-caracteristicas" id="content1">
        <img src="https://via.placeholder.com/500?text=Imagen+1" alt="Imagen 1"/>
    </div>
    <div className="tab-content-caracteristicas" id="content2">
        <img src="https://via.placeholder.com/500?text=Imagen+2" alt="Imagen 2"/>
    </div>
    <div className="tab-content-caracteristicas" id="content3">
        <img src="https://via.placeholder.com/500?text=Imagen+3" alt="Imagen 3"/>
    </div>
    <div className="tab-content-caracteristicas" id="content4">
        <img src="https://via.placeholder.com/500?text=Imagen+4" alt="Imagen 4"/>
    </div>

    <div className="tabs-caracteristicas">
        <label htmlFor="tab1" className="tab-title-caracteristicas">
            <h3>Coordinación</h3>
            <p>Mejora la precisión y el control de los movimientos, fundamental para recuperar habilidades motoras perdidas y facilitar la transición a actividades cotidianas.</p>
        </label>
        <label htmlFor="tab2" className="tab-title-caracteristicas">
            <h3>Fuerza</h3>
            <p>Desarrolla la capacidad de ejercer fuerza contra la resistencia, crucial para recuperar la funcionalidad, prevenir lesiones y aumentar la independencia física.</p>
        </label>
        <label htmlFor="tab3" className="tab-title-caracteristicas">
            <h3>Flexibilidad</h3>
            <p>Aumenta la amplitud de movimiento de las articulaciones y músculos, esencial para restaurar la movilidad, prevenir lesiones y mejorar la postura corporal.</p>
        </label>
        <label htmlFor="tab4" className="tab-title-caracteristicas">
            <h3>Resistencia</h3>
            <p>Incrementa la capacidad de mantener el esfuerzo durante periodos prolongados, vital para mejorar la capacidad funcional, la resistencia cardiovascular y la energía diaria.</p>
        </label>
    </div>
</div>

    );
};
export default Caracteristicas;