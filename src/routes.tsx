import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Login } from './layouts/Login';
import { Signup } from './layouts/Signup';
import { Survey } from './layouts/Survey';
import { Main } from './layouts/Main';
import { Landing } from './layouts/Landing';
import DesignSystem from './layouts/DesignSystem';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';
import { getFromCookies } from './utils/helpers';

const loaderToLogin = () => {
  const uidCookie = getFromCookies('uid');
  const isAuthenticated = uidCookie !== undefined && uidCookie !== '';
  if (!isAuthenticated) {
    return redirect('/login');
  }
  return null;
};
const loaderToMain = () => {
  if (Cookies.get('uid') !== undefined && Cookies.get('uid') !== '') {
    return redirect('/app');
  }
  return null;
};
const loaderSurvey = () => {
  if (!Cookies.get('currentSurvey'))
    // {
    //   return redirect("/app");
    // }
    return null;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/app',
        element: <Main />,
        loader: loaderToLogin,
      },
    ],
  },
  {
    path: '/app',
    element: <Main />,
    loader: loaderToLogin,
  },
  {
    path: '/login',
    element: <Login />,
    loader: loaderToMain,
  },
  {
    path: '/signup',
    element: <Signup />,
    loader: loaderToMain,
  },
  {
    path: '/survey',
    element: <Survey />,
    //loader: loaderSurvey,
  },
  {
    path: '/designsystem',
    element: <DesignSystem />,
  },
]);
