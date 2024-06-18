import './sidebar.scss';
import { Home, DumbBell, Compass, StarCircle, Conf, Exit } from './icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import profileImg from '../assets/profileImg.png';
import { removeFromCookies, removeFromLocalStorageArray } from '../utils/helpers';
import { useModal } from '../contexts/ModalContext';
import { Modal } from './Modal';

interface SideBarProps {
  username?: string;
}

export const SideBar = ({ username }: SideBarProps) => {
  const { showModal, setShowModal, setShowModalTraining, setPendingPath } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  const handleExit = () => {
    removeFromLocalStorageArray(['mainProgram', 'rehabdays', 'userInfo']);
    removeFromCookies(['uid', 'username']);
    navigate('/');
  };
  const cancelNavigation = () => {
    setShowModal(false);
  };

  const handleNavigationAttempt = (path: string) => {
    if (path === '/exit') {
      setShowModal(true);
    } else if (location.pathname === '/training') {
      setPendingPath(path);
      setShowModalTraining(true);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      {showModal && (
        <Modal
          onConfirm={handleExit}
          onCancel={cancelNavigation}
          text="¿Estás seguro de que desea salir?"
          confirmText="Si, deseo salir"
          cancelText="Cancelar"
        />
      )}
      <div className="sidebar">
        <div className="sidebar__user">
          <img src={profileImg} className="profile_img" />
          <div className="profile__info">
            <span className="profile__name">{username ?? ''}</span>
            vtr_91
          </div>
        </div>
        <ul className="sidebar__bar">
          <li className="sidebar_bar_option">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={e => {
                e.preventDefault();
                handleNavigationAttempt('/');
              }}
            >
              <Home fill="#FF662D" className="sidebar__icon" />
              Home
            </NavLink>
          </li>

          <li className="sidebar_bar_option">
            <NavLink
              to="/routine"
              className={({ isActive }) => (isActive || location.pathname === '/training' ? 'active' : '')}
              onClick={e => {
                e.preventDefault();
                handleNavigationAttempt('/routine');
              }}
            >
              <DumbBell fill="#FF662D" className="sidebar__icon" />
              Mi entrenamiento
            </NavLink>
          </li>

          <li className="sidebar_bar_option">
            <NavLink
              to="/library"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={e => {
                e.preventDefault();
                handleNavigationAttempt('/library');
              }}
            >
              <Compass fill="#FF662D" className="sidebar__icon" />
              Biblioteca
            </NavLink>
          </li>
          <li className="sidebar_bar_option hidden_option">
            <NavLink
              to="/subscription"
              className={({ isActive }) => (isActive ? 'active' : 'hidden')}
              onClick={e => {
                e.preventDefault();
                handleNavigationAttempt('/subscription');
              }}
            >
              <StarCircle fill="#FF662D" className="sidebar__icon" />
              Suscripción
            </NavLink>
          </li>
          <li className="sidebar_bar_option">
            <NavLink
              to="/configuration"
              className="siber_bar_option_link"
              onClick={e => {
                e.preventDefault();
                handleNavigationAttempt('/configuration');
              }}
            >
              <Conf fill="#FF662D" className="sidebar__icon" />
              Configuración
            </NavLink>
          </li>
        </ul>
        <button
          className="sidebar__exit"
          onClick={e => {
            e.preventDefault();
            handleNavigationAttempt('/exit');
          }}
        >
          <Exit fill="#FF662D" className="sidebar__icon" />
          Exit
        </button>
      </div>
    </>
  );
};

export default SideBar;
