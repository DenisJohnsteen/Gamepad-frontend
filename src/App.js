import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
//IMPORT COMPONENTS
import Header from "./components/Header";

// IMPORT PAGES
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Details from "./pages/Details";
import Favorite from "./pages/Favorite";

function App() {
  const [favorite, setFavorite] = useState([Cookies.get("favorite")]);
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const handleFavorite = (tab) => {
    const tabString = JSON.stringify(tab);
    Cookies.set("favorite", tabString);
    // setFavorite(tab);
  };

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token);
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header token={token} handleToken={handleToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/details/:id"
          element={
            <Details
              favorite={favorite}
              setFavorite={setFavorite}
              handleFavorite={handleFavorite}
            />
          }
        />
        <Route path="/signin" element={<Login handleToken={handleToken} />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route
          path="/collection"
          element={<Favorite favorite={favorite} setFavorite={setFavorite} />}
        />
      </Routes>
    </Router>
  );
}
export default App;
