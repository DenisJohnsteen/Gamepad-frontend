import { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../assets/logoNeon.jpg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("");

  const sortOptions = ["name", "rating", "released"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=2092a1dbb9c246d3871f108928ae56fa&page=${page}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);

  return isLoading ? (
    <p>en cour de chargement...</p>
  ) : (
    <div>
      <div className="container-title">
        <img className="logo-title" src={Logo} alt="" />
        <h1>Gamepad</h1>
      </div>
      <div className="searchBox">
        <center>
          <input
            className="searchingBar"
            type="text"
            placeholder="Search for a game"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <i className="fa-solid fa-magnifying-glass fa-2x"></i>
        </center>
      </div>
      <center>
        <span className="count">Search {data.count} games</span>
      </center>

      <h1 className="mostRelevanceGame">Most Relevance Games</h1>
      <div className="container-game-title">
        {data.results.map((item) => {
          return (
            <>
              <div className="container-game-img">
                <img
                  className="game-image"
                  src={item.background_image}
                  alt=""
                />

                <h2 className="game-title">{item.name}</h2>
              </div>
            </>
          );
        })}
      </div>

      <center>
        <button
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </center>
    </div>
  );
};

export default Home;
