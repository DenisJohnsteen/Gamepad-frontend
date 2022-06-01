import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ handleToken }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:4000/user/login", {
          email: email,
          password: password,
        });
        console.log(response.data);

        handleToken(response.data.token);

        console.log(error);
        navigate("/");
      } catch (error) {
        console.log(error.response);
        setError(error.response.statusText);
      }
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };

  return (
    <div className="container-form-signin">
      <div className="signin-column-left">
        <div className="container-inside">
          <h1>How it works?</h1>
          <div className="user">
            <i
              style={{ color: "white" }}
              className="fa-solid fa-user fa-2x"
            ></i>
            <div>
              Log in to your free account to be able to get all features of
              Gamepad
            </div>
          </div>
          <div className="collection">
            <i
              style={{ color: "white" }}
              className="fa-solid fa-bookmark fa-2x"
            ></i>
            <span>Add a game to you collection</span>
          </div>
          <div className="comment">
            <i
              style={{ color: "white" }}
              className="fa-solid fa-message fa-2x"
            ></i>
            <span>Leave a review for a game</span>
          </div>
        </div>
      </div>

      <div className="signin-column-right">
        <form onSubmit={handleSubmit}>
          <center>
            <h1>Login</h1>
            <div className="username-password">
              <input
                placeholder="Email"
                type="text"
                value={email}
                name="email"
                onChange={handleEmail}
              />
              <br />
              <input
                placeholder="Password"
                type="password"
                value={password}
                name="password"
                onChange={handlePassword}
              />
            </div>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            <button type="onSubmit">Connexion</button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Login;
