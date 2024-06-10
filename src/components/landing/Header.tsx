import { Link } from 'react-router-dom';
import { LogoWordmarkWhite } from '../branding';
import './header.scss';
import Btn from '../Btn';

export const Header = () => {
  return (
    <header className="header">
      <div className='top_nav_web'>
        <Link to={'/'}>
          <LogoWordmarkWhite className='landing_logo'/>
        </Link>
        <div className="topmenu">
          <nav>
            <ul className="nav_links">
              <li className="nav_item">
                <a className="nav_items_links" href="#beneficios">Beneficios</a>
              </li>
              <li className="nav_item">
                <a className="nav_items_links" href="#funcionamiento">¿Cómo funciona?</a>
              </li>
              <li className="nav_item">
                <a className="nav_items_links" href="#funcionalidades">Funcionalidades</a>
              </li>
            </ul>
          </nav>
          <div className="buttons_app">
            <button className="login_web">Iniciar Sesión</button>
            <Btn text="Registrarse" btnClass="primary" />
          </div>
        </div>
      </div>
      <div className="container_header">
        <h1 className="title_header">La plataforma que te ayuda a rehabilitarte por tu cuenta</h1>
        <p className="text_header">Revibes es una plataforma digital que te ayuda a rehabilitarte a tu ritmo y sin necesidad de servicios sanitarios</p>
        <button className="gotosignup">Empezar ya</button>
      </div>
    </header>
  );
};

export default Header;