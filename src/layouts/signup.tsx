import { useState, useEffect } from "react";
import { loginGoogle, signup } from "../api/login";
import { createUser } from "../api/users";
import Cookies from "js-cookie";
import { User } from "../models";
import { useNavigate, Link } from "react-router-dom";
import InputIcon from "../components/InputIcon";
import Cta from "../components/Cta";
import {
  UserIcon,
  UserRounded,
  PassIcon,
  GoogleLoginIcon,
  AppleLoginIcon,
} from "../components/icons/Icons";
import SignupMain from "../assets/signupMain.png";

import { LogoWordmark } from "../components/branding/LogoWordmark";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const navigate = useNavigate();

  useEffect(() => {});

  const handleLoginGoogle = async () => {
    const { isLogged, uid, message, imgUrl } = await loginGoogle();
    if (isLogged) {
      Cookies.set("uuid", uid, { path: "" });
      navigate("/app");
    } else {
      alert(message);
    }
  };
  const handleSignup = async () => {
    const signupValue = await signup(email, password);
    if (signupValue.succesfull) {
      const user: User = {
        name: name,
        email: email,
      };
      const created = await createUser(user);
      if (created ?? false) {
        console.log("created !");
        localStorage.setItem("authenticated", JSON.stringify(true));
        navigate("/");
      }
    } else {
      alert(signupValue.errorMsg);
    }
  };

  const handleSubmit = async () => {
    //signup("revibes@gmail.com", "mandatorico");
    //validation
    if (password === passwordRepeated) {
      await handleSignup();
    } else {
      alert("Las contraseñas no coinciden");
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
          <p className="signup__text">
            ¡Bienvenido a Revibes! Únete ahora y empieza tu transformación.
          </p>
        </div>
        <form className="signup__form">
          <div className="signup__form_email">
            <InputIcon
              icon={UserRounded}
              iconWidth={19}
              iconHeight={19}
              label="Nombre"
              name="surname"
              value={name}
              setValue={setName}
              type="text"
            />
            <InputIcon
              icon={UserIcon}
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
              <Cta
                text="Registrarse"
                action={async (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleSubmit();
                }}
              />
              <p>
                ¿Ya tienes cuenta?
                <Link to={"/signup"} className="signup__cta-register">
                  Inicia sesión ahora
                </Link>
              </p>
            </div>
          </div>
        </form>
        <div className="signup__form_alternatives">
          <p className="divider">O si lo prefieres, inicia sesión con</p>
          <div className="signup__form_alternatives__btns">
            <button
              type="button"
              className="signup_alternatives__btn"
              onClick={handleLoginGoogle}
            >
              <GoogleLoginIcon height={40} width={40} />
            </button>
            <button
              type="button"
              className="signup_alternatives__btn"
              onClick={handleLoginGoogle}
            >
              <AppleLoginIcon height={40} width={40} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
