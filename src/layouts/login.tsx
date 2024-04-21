import { useState, useEffect } from "react";
import { login, loginGoogle } from "../api/login";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import InputIcon from "../components/InputIcon";
import Cta from "../components/Cta";
import loginMain from "../assets/loginMain.png";
import { LogoWordmark } from "../components/branding/LogoWordmark";
import {
  UserIcon,
  PassIcon,
  AppleLoginIcon,
  GoogleLoginIcon,
} from "../components/icons/Icons";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {});

  const handleLogin = async () => {
    //login("revibes@gmail.com", "mandatorico");
    const { isLogged, uid } = await login(email, password);
    console.log(uid);
    if (isLogged) {
      Cookies.set("uuid", uid, { path: "" });
      navigate("/app");
    }
  };
  const handleLoginGoogle = async () => {
    const { isLogged, uid, message, imgUrl } = await loginGoogle();
    if (isLogged) {
      Cookies.set("uuid", uid, { path: "" });
      navigate("/app");
    } else {
      alert(message);
    }
  };

  return (
    <div className="login">
      <img src={loginMain} className="login__img" />
      <div className="login__content">
        <div className="login__logo">
          <LogoWordmark height={50} width={"auto"} />
        </div>
        <div className="login__info">
          <div className="login__title">Login</div>
          <p className="login__text">
            ¡Que bueno verte de nuevo! Inicia sesión para entrar a tu
            entrenamiento de rehabilitación y darlo todo.
          </p>
        </div>
        <form className="login__form">
          <div className="login__form_email">
            <InputIcon
              icon={UserIcon}
              iconWidth={19}
              iconHeight={19}
              label="Correo electrónico"
              name="mail"
              value={email}
              setValue={setEmail}
              type="email"
            />
            <InputIcon
              icon={PassIcon}
              iconWidth={19}
              iconHeight={19}
              label="Contraseña"
              name="password"
              value={password}
              setValue={setPassword}
              type="password"
            />
            <div>
              <div className="login__cta">
                <Cta
                  text="Iniciar sesión"
                  action={async (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleLogin();
                  }}
                />
                <p>
                  ¿Todavia no tienes cuenta?
                  <Link to={"/signup"} className="login__cta-register">
                    Registrate ahora
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="login__form_alternatives">
            <p className="divider">O si lo prefieres, inicia sesión con</p>
            <div className="login__form_alternatives__btns">
              <button
                type="button"
                className="login_alternatives__btn"
                onClick={handleLoginGoogle}
              >
                <GoogleLoginIcon height={40} width={40} />
              </button>
              <button
                type="button"
                className="login_alternatives__btn"
                onClick={handleLoginGoogle}
              >
                <AppleLoginIcon height={40} width={40} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
