import './sidebar.scss';
import { Home, DumbBell, Compass, StarCircle, Conf, Exit } from './icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import profileImg from '../assets/profileImg.png';
import { getFromCookies, removeFromCookies, removeFromLocalStorageArray } from '../utils/helpers';
import { useModal } from '../contexts/ModalContext';
import { Modal } from './Modal';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContextProvider';
import { UserFromApi } from '../models';
import classNames from 'classnames';

export const SideBar = () => {
  const { showModal, setShowModal, setShowModalTraining, setPendingPath } = useModal();
  const { userInfo, username, currentProgramId } = useContext(UserContext);
  const usernameSidebar = username ? username : getFromCookies('username');
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
      <div
        className={classNames({
          sidebar: true,
          [`sidebar__training`]: location.pathname === '/training',
        })}
      >
        <div
          className={classNames({
            sidebar__user: true,
            [`sidebar__user__training`]: location.pathname === '/training',
          })}
          onClick={() => navigate('/profile')}
        >
          <img src={profileImg} className="profile_img" />
          <div className="profile__info">
            <span className="profile__name">{usernameSidebar ?? ''}</span>
            {userInfo !== ({} as UserFromApi) ? <span>{userInfo.username}</span> : <span>{username}</span>}
          </div>
        </div>
        <ul
          className={classNames({
            sidebar__bar: true,
            [`sidebar__bar__training`]: location.pathname === '/training',
          })}
        >
          <li
            className={classNames({
              sidebar_bar_option: true,
              [`sidebar_bar_option__training`]: location.pathname === '/training',
            })}
          >
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

          <li
            className={classNames({
              sidebar_bar_option: true,
              [`sidebar_bar_option__training`]: location.pathname === '/training',
            })}
          >
            <NavLink
              to={`/routine/${currentProgramId}`}
              className={({ isActive }) => (isActive || location.pathname === '/training' ? 'active' : '')}
              onClick={e => {
                e.preventDefault();
                handleNavigationAttempt(`/routine/${currentProgramId}`);
              }}
            >
              <DumbBell fill="#FF662D" className="sidebar__icon" />
              Mi entrenamiento
            </NavLink>
          </li>

          <li
            className={classNames({
              sidebar_bar_option: true,
              [`sidebar_bar_option__training`]: location.pathname === '/training',
            })}
          >
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
          <li
            className={classNames({
              sidebar_bar_option: true,
              hidden_option: true,
              [`sidebar_bar_option__training`]: location.pathname === '/training',
            })}
          >
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
          <li
            className={classNames({
              sidebar_bar_option: true,
              [`sidebar_bar_option__training`]: location.pathname === '/training',
            })}
          >
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
          className={classNames({
            sidebar__exit: true,
            [`sidebar__exit__training`]: location.pathname === '/training',
          })}
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
