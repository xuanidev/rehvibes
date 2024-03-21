import { useState, useEffect } from "react";
import "./signup.scss";
import { signup } from "../api/login";
import { createUser } from "../api/users";
import { User } from "../models";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {});

  const handleSignUp = async () => {
    //login("revibes@gmail.com", "mandatorico");
    //validation
    const loginValue = await signup(email, password);
    if (loginValue) {
      const user: User = {
        name: name,
        surname: surname,
        username: username,
        mail: email,
      };

      const created = await createUser(user);
      if (created) {
        console.log("created !");
        localStorage.setItem("authenticated", JSON.stringify(true));
        navigate("/");
      }
    }
  };

  return (
    <div className="signup">
      <form className="signup__form">
        <div>
          <label>Name</label>
          <input
            name="name"
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Surname</label>
          <input
            name="surname"
            type="text"
            required
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div>
          <label>User name</label>
          <input
            name="username"
            type="text"
            required
            placeholder="User name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email address</label>
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
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
              handleSignUp();
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
