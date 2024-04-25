import { useState, useEffect } from "react";
import { login, loginGoogle } from "../api/login";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import InputIcon from "../components/InputIcon";
import BtnCta from "../components/BtnCta";
import loginMain from "../assets/loginMain.png";
import { LogoWordmark } from "../components/branding/LogoWordmark";
import {
  UserIcon,
  PassIcon,
  AppleLoginIcon,
  GoogleLoginIcon,
} from "../components/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastError } from "../optionsData";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {});

  const handleLogin = async () => {
    //login("revibes@gmail.com", "mandatorico");
    const { isLogged, uid, errorMsg } = await login(email, password);
    console.log();
    if (isLogged) {
      Cookies.set("uid", uid, { path: "" });
      console.log(isLogged);
      navigate("/app");
    } else {
      toast.error(errorMsg, toastError);
    }
  };
  const handleLoginGoogle = async () => {
    const { isLogged, uid, errorMsg, imgUrl } = await loginGoogle();
    if (isLogged) {
      Cookies.set("uid", uid, { path: "" });
      navigate("/app");
    } else {
      toast.error(errorMsg, toastError);
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
        <form
          className="login__form"
          onSubmit={async (event) => {
            event.preventDefault();
            event.stopPropagation();
            handleLogin();
          }}
        >
          <div className="login__form_email">
            <InputIcon
              icon={UserIcon}
              className={"color-brand"}
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
              className={"color-brand"}
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
                <BtnCta text="Iniciar sesión" type="submit" />
                <p>
                  ¿Todavia no tienes cuenta?
                  <Link to={"/signup"} className="login__cta-register">
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
      </div>
      <ToastContainer />
    </div>
  );
};
