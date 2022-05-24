import Logo from "../assets/logoNeon.jpg";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-left">
        <img className="logo" src={Logo} alt="" />
        <h1>GamePad</h1>
      </div>
      <div className="header-right">
        <button>My Collection</button>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Header;
