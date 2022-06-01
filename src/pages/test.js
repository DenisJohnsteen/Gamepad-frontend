import { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../assets/logoNeon.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [platform, setPlatform] = useState("");
  const [type, setType] = useState("");
  const [sortValue, setSortValue] = useState("");

  const sortOptions = ["name", "rating", "released"];
  const gamePlatform = ["3", "4", "5"];
  const gameType = [
    "action",
    "adventure",
    "indie",
    "shooter",
    "casual",
    "simulation",
    "strategy",
  ];

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

  const handleSearch = async () => {
    return await axios
      .get(
        `https://api.rawg.io/api/games?key=2092a1dbb9c246d3871f108928ae56fa&search=${search}`
      )
      .then((response) => {
        setData(response.data);
        // setSearch("");
      })
      .catch((error) => console.log(error));
  };

  const handleFilter = async (event) => {
    event.preventDefault();
    return await axios
      .get(
        `https://api.rawg.io/api/games?key=2092a1dbb9c246d3871f108928ae56fa&platforms=${platform}&genres=${type}&${sortValue}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  };

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
            value={search}
            placeholder="Search for a game"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <i
            className="fa-solid fa-magnifying-glass fa-2x"
            onClick={handleSearch}
          ></i>
        </center>
      </div>

      <center>
        {search && (
          <p className="search-result">Search result for "{search}"</p>
        )}
        <span className="count">Search {data.count} games</span>
      </center>

      <h1 className="mostRelevanceGame">Most Relevance Games</h1>
      <main>
        <div className="container-filter">
          <form onSubmit={handleFilter}>
            <div className="filter-left">
              <div className="container-platform">
                <span> Platform:</span>

                <select
                  onChange={(event) => {
                    setPlatform(event.target.value);
                  }}
                  value={platform}
                >
                  <option>All</option>
                  {gamePlatform.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="container-type">
                <span> Type:</span>
                <select
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                  value={type}
                >
                  <option>All</option>
                  {gameType.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-right">
              <div className="container-sort">
                <span> Sort By:</span>
                <select
                  onChange={(event) => {
                    setSortValue(event.target.value);
                  }}
                  value={sortValue}
                >
                  <option>Default</option>
                  {sortOptions.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <button>FILTER</button>
            </div>
          </form>
        </div>

        <div className="container-game-title">
          {data.results.map((item) => {
            const id = item.id;
            return (
              <>
                <div className="container-game-img">
                  <Link to={`/details/${id}`}>
                    <img
                      className="game-image"
                      src={item.background_image}
                      alt=""
                    />
                  </Link>
                  <h2 className="game-title">{item.name}</h2>
                </div>
              </>
            );
          })}
        </div>
      </main>

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
