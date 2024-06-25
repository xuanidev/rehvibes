import './formulario.scss';

export const Formulario = () => {
    return (
        <div className="form-section">
            <h2 className="title-form">estamos para ayudarte</h2>
            <h3 className="title-sub">tu puerta hacia una vida renovada y saludable</h3>
            
            <div className="contact-form">
                <div className="form-row">
                    <div className="form-left">
                        <label>Nombre y apellidos</label>
                        <input className='input_landing' type="text" placeholder="Nombre y apellidos" />
                        
                        <label>Correo electrónico</label>
                        <input className='input_landing' type="email" placeholder="Correo electrónico" />
                    </div>
                    
                    <div className="form-right">
                        <label>Fecha de nacimiento</label>
                        <input className='input_landing' type="date" placeholder="Fecha de nacimiento" />
                        
                        <label>Teléfono</label>
                        <input className='input_landing' type="tel" placeholder="Teléfono" />
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="rrss">
                        <p className="text_redes">Síguenos en nuestras redes</p>
                        <div className="rrss-icons">
                            <i className="fab fa-facebook" aria-hidden="true"></i>
                            <i className="fab fa-linkedin" aria-hidden="true"></i>
                            <i className="fab fa-youtube" aria-hidden="true"></i>
                            <i className="fab fa-instagram" aria-hidden="true"></i>
                        </div>
                    </div>
                    
                    <div className="form-message">
                        <label htmlFor="message">Mensaje</label>
                        <textarea id="message" placeholder="ESCRIBA SU MENSAJE AQUÍ"></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Formulario;
