import { useState, useEffect } from "react";
import "./login.scss";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {});

  const handleLogin = async () => {
    //login("revibes@gmail.com", "mandatorico");
    const loginValue = await login(email, password);
    console.log(loginValue);
    if (loginValue) {
      localStorage.setItem("authenticated", JSON.stringify(true));
      navigate("/");
    }
  };

  return (
    <div className="login">
      <form className="login__form">
        <div>
          <label htmlFor="email-address">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleLogin();
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
