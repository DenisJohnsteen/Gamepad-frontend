import Logo from "../assets/logoNeon.jpg";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, handleToken }) => {
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <div className="header-left">
        <Link to="/">
          <img className="logo" src={Logo} alt="" />
        </Link>
        <h1>GamePad</h1>
      </div>
      <div className="header-right">
        <Link to="/collection">
          <button className="myCollection">My Collection</button>
        </Link>
        <div className="signup-join">
          {token === null ? (
            <>
              <Link to="/signin">
                <button>Signin</button>
              </Link>
              <button>|</button>
              <Link to="/signup">
                <button>Join</button>{" "}
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleToken(null);
                navigate("/");
              }}
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
