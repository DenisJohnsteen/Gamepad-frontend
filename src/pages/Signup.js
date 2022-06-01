import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleToken }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    const value = event.target.value;
    setUserName(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "http://localhost:4000/user/signup",
            {
              username: userName,
              email: email,
              password: password,
              newsletter: newsletter,
            }
          );
          console.log(response.data);
          handleToken(response.data.token);
          navigate("/");
        } catch (error) {
          console.log(error.response);
        }
      } else {
        setError("Vos mots de passe ne sont pas identiques");
      }
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };

  return (
    <div className="container-form-signup">
      <div className="signup-column-left">
        <div className="container-inside">
          <h1>How it works?</h1>
          <div className="user">
            <i style={{ color: "white" }} class="fa-solid fa-user fa-2x"></i>
            <div>
              Log in to your free account to be able to get all features of
              Gamepad
            </div>
          </div>
          <div className="collection">
            <i
              style={{ color: "white" }}
              class="fa-solid fa-bookmark fa-2x"
            ></i>
            <span>Add a game to you collection</span>
          </div>
          <div className="comment">
            <i style={{ color: "white" }} class="fa-solid fa-message fa-2x"></i>
            <span>Leave a review for a game</span>
          </div>
        </div>
      </div>
      <div className="signup-column-right">
        <center>
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit}>
            <div className="username-email">
              <input
                type="text"
                placeholder="Username"
                name="name"
                value={userName}
                onChange={handleNameChange}
              />
              <br />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
              <br />
            </div>
            <div className="password">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <input
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {error ? <p style={{ color: "red" }}>{error}</p> : null}
              <br />
            </div>
            <span>S'inscrire à notre newsletter</span>
            <input
              type="checkbox"
              onClick={() => {
                setNewsletter(!newsletter);
              }}
            />
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Gamepad. Je confirme
              avoir au moin 18ans
            </p>
            <button type="submit">Register</button>
          </form>
        </center>
      </div>
    </div>
  );
};

export default Signup;
