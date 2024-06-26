import { Outlet } from 'react-router-dom';
import './styles/style.scss';
import SideBar from './components/Sidebar';
import { ModalProvider } from './contexts/ModalContext';
import { UserContextProvider } from './contexts/UserContextProvider';
import { ExercisesContextProvider } from './contexts/ExercisesContextProvider';

export const App = () => {
  return (
    <ModalProvider>
      <UserContextProvider>
        <ExercisesContextProvider>
          <div className="app">
            <SideBar />
            <Outlet />
          </div>
        </ExercisesContextProvider>
      </UserContextProvider>
    </ModalProvider>
  );
};
