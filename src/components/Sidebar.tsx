import { Home } from "./icons";
import { NavLink } from "react-router-dom";
import profileImg from "../assets/profileImg.png";

export const SideBar = () => {
  <div className="sidebar">
    <div className="sideber__user">
      <img src={profileImg} className="profile_img" />
      <div className="profile__info">
        <span className="profile__name">Vicente Torner</span>
        <span className="profile__username">vtr_91</span>
      </div>
    </div>
    <ul className="sidebar__bar">
      <li className="sidebar_bar_option">
        <NavLink to="/">
          <span className="sidebar__icons">
            <Home fill="#FF662D" />
          </span>
          Home
        </NavLink>
      </li>

      <li className="sidebar_bar_option">
        <NavLink to="/">
          <span className="sidebar__icons">
            <Home fill="#FF662D" />
          </span>
          Mi entrenamiento
        </NavLink>
      </li>

      <li className="sidebar_bar_option">
        <NavLink to="/">
          <span className="sidebar__icons">
            <Home fill="#FF662D" />
          </span>
          Biblioteca
        </NavLink>
      </li>
      <li className="sidebar_bar_option">
        <NavLink to="/">
          <span className="sidebar__icons">
            <Home fill="#FF662D" />
          </span>
          Calendario
        </NavLink>
      </li>
      <li className="sidebar_bar_option">
        <NavLink to="/">
          <span className="sidebar__icons">
            <Home fill="#FF662D" />
          </span>
          Suscripción
        </NavLink>
      </li>
      <li className="sidebar_bar_option">
        <NavLink to="/">
          <span className="sidebar__icons">
            <Home fill="#FF662D" />
          </span>
          Configuración
        </NavLink>
      </li>
    </ul>
  </div>;
};
