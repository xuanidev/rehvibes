import { useState, useEffect } from 'react';
import { login, loginGoogle } from '../api/login';
import { Link, useNavigate } from 'react-router-dom';
import { InputIcon, BtnCta, Btn } from '../components';
import loginMain from '../assets/loginMain.png';
import { LogoWordmark } from '../components/branding/LogoWordmark';
import { UserIcon, PassIcon, AppleLoginIcon, GoogleLoginIcon } from '../components/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastError } from '../constants';
import { saveOnCookies } from '../utils/helpers';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {});

  const handleLogin = async () => {
    //login("revibes@gmail.com", "mandatorico");
    try {
      const { uid } = await login(email, password);
      saveOnCookies('uid', uid ?? '');
      navigate('/app');
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage, toastError);
    }
  };
  const handleLoginGoogle = async () => {
    try {
      const { uid, imgUrl } = await loginGoogle();
      console.log(uid);
      saveOnCookies('uid', uid ?? '');
      navigate('/app');
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage, toastError);
    }
  };

  return (
    <div className="login">
      <img src={loginMain} className="login__img" />
      <div className="login__content">
        <div className="login__logo">
          <LogoWordmark height={50} />
        </div>
        <div className="login__info">
          <div className="login__title">Login</div>
          <p className="login__text">
            ¡Que bueno verte de nuevo! Inicia sesión para entrar a tu entrenamiento de rehabilitación y darlo todo.
          </p>
        </div>
        <form
          className="login__form"
          onSubmit={async event => {
            event.preventDefault();
            event.stopPropagation();
            handleLogin();
          }}
        >
          <div className="login__form_email">
            <InputIcon
              icon={UserIcon}
              className={'color-brand'}
              iconWidth={19}
              iconHeight={19}
              label="Correo electrónico"
              name="email"
              value={email}
              setValue={setEmail}
              type="email"
              required={true}
            />
            <InputIcon
              icon={PassIcon}
              className={'color-brand'}
              iconWidth={19}
              iconHeight={19}
              label="Contraseña"
              name="password"
              value={password}
              setValue={setPassword}
              type="password"
              required={true}
            />
            <div>
              <div className="login__cta">
                <Btn text="Iniciar sesión" btnClass="primary full" type="submit"></Btn>
                <p>
                  ¿Todavia no tienes cuenta?
                  <Link to={'/signup'} className="login__cta-register">
                    Registrate ahora
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
        <div className="login__form_alternatives">
          <p className="divider">O si lo prefieres, inicia sesión con</p>
          <div className="login__form_alternatives__btns">
            <button type="button" className="login_alternatives__btn" onClick={handleLoginGoogle}>
              <GoogleLoginIcon height={40} width={40} />
            </button>
            <button type="button" className="login_alternatives__btn" onClick={handleLoginGoogle}>
              <AppleLoginIcon height={40} width={40} />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
