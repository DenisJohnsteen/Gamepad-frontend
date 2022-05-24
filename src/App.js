import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//IMPORT COMPONENTS
import Header from "./components/Header";

// IMPORT PAGES
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;
