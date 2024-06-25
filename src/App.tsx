import { Outlet } from 'react-router-dom';
import './styles/style.scss';
import SideBar from './components/Sidebar';
import { ModalProvider } from './contexts/ModalContext';
import { UserContextProvider } from './contexts/UserContextProvider';

export const App = () => {
  return (
    <ModalProvider>
      <UserContextProvider>
        <div className="app">
          <SideBar />
          <Outlet />
        </div>
      </UserContextProvider>
    </ModalProvider>
  );
};
