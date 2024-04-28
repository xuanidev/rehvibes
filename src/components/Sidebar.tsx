import "./sidebar.scss";
import {
  Home,
  DumbBell,
  Compass,
  Calendar,
  StarCircle,
  Conf,
  Exit,
} from "./icons";
import { NavLink } from "react-router-dom";
import profileImg from "../assets/profileImg.png";

export const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img src={profileImg} className="profile_img" />
        <div className="profile__info">
          <span className="profile__name">Vicente Torner</span>
          vtr_91
        </div>
      </div>
      <ul className="sidebar__bar">
        <li className="sidebar_bar_option">
          <NavLink
            to="/app"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Home fill="#FF662D" className="sidebar__icon" />
            Home
          </NavLink>
        </li>

        <li className="sidebar_bar_option">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <DumbBell fill="#FF662D" className="sidebar__icon" />
            Mi entrenamiento
          </NavLink>
        </li>

        <li className="sidebar_bar_option">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Compass fill="#FF662D" className="sidebar__icon" />
            Biblioteca
          </NavLink>
        </li>
        <li className="sidebar_bar_option">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Calendar fill="#FF662D" className="sidebar__icon" />
            Calendario
          </NavLink>
        </li>
        <li className="sidebar_bar_option hidden_option">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "hidden")}
          >
            <StarCircle fill="#FF662D" className="sidebar__icon" />
            Suscripción
          </NavLink>
        </li>
        <li className="sidebar_bar_option">
          <NavLink to="/" className="siber_bar_option_link">
            <Conf fill="#FF662D" className="sidebar__icon" />
            Configuración
          </NavLink>
        </li>
      </ul>
      <div className="sidebar__exit ">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <Exit fill="#FF662D" className="sidebar__icon" />
          Exit
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
