import Btn from '../Btn';
import { Facebook, Instagram, Linkedin, Youtube } from '../icons';
import './formulario.scss';

export const Formulario = () => {
  return (
    <div className="form-section">
      <h2 className="title-form">estamos para ayudarte</h2>
      <h3 className="title-sub">tu puerta hacia una vida renovada y saludable</h3>

      <div className="contact-form">
        <div className="form-row">
          <div className="form-left">
            <div className="form__item">
              <label>Nombre y apellidos</label>
              <input className="input_landing" type="text" placeholder="Nombre y apellidos" />
            </div>
            <div className="form__item">
              <label>Correo electrónico</label>
              <input className="input_landing" type="email" placeholder="Correo electrónico" />
            </div>
          </div>

          <div className="form-right">
            <div className="form__item">
              <label>Fecha de nacimiento</label>
              <input className="input_landing" type="date" placeholder="Fecha de nacimiento" />
            </div>
            <div className="form__item">
              <label>Teléfono</label>
              <input className="input_landing" type="tel" placeholder="Teléfono" />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="rrss">
            <p className="text_redes">Síguenos en nuestras redes</p>
            <div className="redes_sociales_iconos">
              <Facebook className="icono_rrss" />
              <Linkedin className="icono_rrss" />
              <Youtube className="icono_rrss" />
              <Instagram className="icono_rrss" />
            </div>
          </div>

          <div className="form-message">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" className="form-message__textarea" placeholder="ESCRIBA SU MENSAJE AQUÍ"></textarea>
            <Btn btnClass="btnIcon inverse" text="Enviar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
