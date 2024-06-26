import './footer_landing.scss';
import { LogoWordmark } from '../branding';
import { Link } from 'react-router-dom';
import { Icono_Footer_Mail } from '../icons';
import { Icono_Footer_Location } from '../icons';
import { Icono_Footer_Call } from '../icons';

export const Footer_landing = () => {
  return (
    <footer className="footer_section">
      <Link to={'/'}>
        <LogoWordmark className="landing_logo" />
      </Link>
      <div className="container">
        <div className="column_footer">
          <ul className="footer_contact">
            <li className="contact_item">
              <Icono_Footer_Mail className="icon_footer" />
              <h5 className="footer_tittle">revibes.ai@gmail.com</h5>
            </li>
            <li className="contact_item">
              <Icono_Footer_Location className="icon_footer" />
              <h5 className="footer_tittle">Valencia(Spain)</h5>
            </li>
            <li className="contact_item">
              <Icono_Footer_Call className="icon_footer" />
              <h5 className="footer_tittle">(+34) 123 45 67 89</h5>
            </li>
          </ul>
        </div>

        <div className="column_footer">
          <ul className="footer_links">
            <li className="link_footer_item">
              <h5 className="footer_link">Beneficios</h5>
            </li>
            <li className="link_footer_item">
              <h5 className="footer_link">¿Cómo funciona?</h5>
            </li>
            <li className="link_footer_item">
              <h5 className="footer_link">Funcionalidades</h5>
            </li>
          </ul>
        </div>

        <div className="column_footer">
          <ul className="footer_legal">
            <li className="footer_item">
              <h5 className="footer_tittle">Sobre nosotros</h5>
            </li>
            <li className="footer_item">
              <h5 className="footer_tittle">Política de cookies</h5>
            </li>
            <li className="footer_item">
              <h5 className="footer_tittle">Política de privacidad</h5>
            </li>
            <li className="footer_item">
              <h5 className="footer_tittle">Aviso legal</h5>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer_landing;
