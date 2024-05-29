import { useState, useEffect } from 'react';
import { loginGoogle, signup } from '../api/login';
import { useNavigate, Link } from 'react-router-dom';
import { InputIcon, Btn } from '../components';
import { UserIcon, UserRounded, PassIcon, GoogleLoginIcon, AppleLoginIcon } from '../components/icons';
import SignupMain from '../assets/signupMain.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastError } from '../constants';
import { LogoWordmark } from '../components/branding/LogoWordmark';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeated, setPasswordRepeated] = useState('');
  const navigate = useNavigate();
  const classIcons = 'color-brand';

  useEffect(() => {});
  const handleLoginGoogle = async () => {
    try {
      await loginGoogle();
      navigate('/app');
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage, toastError);
    }
  };

  const handleSignup = async () => {
    try {
      await signup(email, password, name);
      navigate('/survey');
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage, toastError);
    }
  };

  const handleSubmit = async () => {
    //signup("revibes@gmail.com", "mandatorico");
    if (password === passwordRepeated) {
      await handleSignup();
    } else {
      toast.error('Las contraseñas no coinciden', toastError);
    }
  };

  return (
    <div className="signup">
      <img src={SignupMain} className="signup__img" />
      <div className="signup__content">
        <div className="signup__logo">
          <LogoWordmark height={50} />
        </div>
        <div className="signup__info">
          <div className="signup__title">Crea tu cuenta</div>
          <p className="signup__text">¡Bienvenido a Revibes! Únete ahora y empieza tu transformación.</p>
        </div>
        <form
          className="signup__form"
          onSubmit={async event => {
            event.preventDefault();
            event.stopPropagation();
            handleSubmit();
          }}
        >
          <div className="signup__form_email">
            <InputIcon
              icon={UserRounded}
              className={classIcons}
              iconWidth={19}
              iconHeight={19}
              label="Nombre"
              name="name"
              value={name}
              setValue={setName}
              type="text"
            />
            <InputIcon
              icon={UserIcon}
              className={classIcons}
              iconWidth={19}
              iconHeight={19}
              label="Correo electrónico"
              name="email"
              value={email}
              setValue={setEmail}
              type="email"
            />
            <InputIcon
              icon={PassIcon}
              className={classIcons}
              iconWidth={19}
              iconHeight={19}
              label="Contraseña"
              name="password"
              value={password}
              setValue={setPassword}
              type="password"
            />
            <InputIcon
              icon={PassIcon}
              className={classIcons}
              iconWidth={19}
              iconHeight={19}
              label="Repetir Contraseña"
              name="passwordRepeated"
              value={passwordRepeated}
              setValue={setPasswordRepeated}
              type="password"
            />
          </div>
          <div>
            <div className="signup__cta">
              <Btn text="Registrarse" btnClass="primary full" type="submit" />
              <p>
                ¿Ya tienes cuenta?
                <Link to={'/login'} className="signup__cta-register">
                  Inicia sesión ahora
                </Link>
              </p>
            </div>
          </div>
        </form>
        <div className="signup__form_alternatives">
          <p className="divider">O si lo prefieres, inicia sesión con</p>
          <div className="signup__form_alternatives__btns">
            <button type="button" className="signup_alternatives__btn" onClick={handleLoginGoogle}>
              <GoogleLoginIcon height={40} width={40} />
            </button>
            <button type="button" className="signup_alternatives__btn" onClick={handleLoginGoogle}>
              <AppleLoginIcon height={40} width={40} />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
