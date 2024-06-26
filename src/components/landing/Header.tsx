import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoWordmarkWhite } from '../branding';
import './header.scss';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="top_nav_web">
        <Link to={'/'}>
          <LogoWordmarkWhite className="landing_logo" />
        </Link>{' '}
        <button className="menu_toggle" onClick={toggleMenu}>
          {menuOpen ? 'X' : '☰'}
        </button>
        <div className={`topmenu ${menuOpen ? 'topmenu--open' : ''}`}>
          <nav className="nav_menu">
            <ul className="nav_links">
              <li className="nav_item">
                <a className="nav_items_links" onClick={() => scrollToSection('beneficios')}>
                  Beneficios
                </a>
              </li>
              <li className="nav_item">
                <a className="nav_items_links" onClick={() => scrollToSection('funcionalidades')}>
                  Funcionalidades
                </a>
              </li>
              <li className="nav_item">
                <a className="nav_items_links" onClick={() => scrollToSection('entrenamientos')}>
                  Entrenamientos
                </a>
              </li>
            </ul>
          </nav>
          <div className="buttons_app">
            <button className="login_web logowordmark_icon_hover_pointer" onClick={() => navigate('/login')}>
              Iniciar Sesión
            </button>
            <button className="signup_web logowordmark_icon_hover_pointer" onClick={() => navigate('/signup')}>
              Registrarse
            </button>
          </div>
        </div>
      </div>

      <div className="container_header">
        <div className="container_header_text">
          <h1 className="title_header">La plataforma que te ayuda a rehabilitarte por tu cuenta</h1>
          <p className="text_header">
            Revibes es una plataforma digital que te ayuda a rehabilitarte a tu ritmo y sin necesidad de servicios
            sanitarios
          </p>
        </div>
        <div className="container_btn">
          <button className="btn_header" onClick={() => navigate('/')}>
            Empieza ya
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
