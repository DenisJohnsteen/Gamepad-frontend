import "./favorite.css";
import Cookies from "js-cookie";

const Favorite = ({ favorite, setFavorite, handleFavorite }) => {
  console.log(favorite);

  const removeFav = (index) => {
    const tab = [...favorite];
    const remove = tab.splice(index, 1);

    // Cookies.remove("favorite");
    handleFavorite(tab);
    // setFavorite(tab);
  };

  return (
    <>
      <h1>My Collection</h1>
      <div className="container-fav">
        {favorite.map((fav, index) => {
          return (
            <div key={index} className="container-img-fav">
              <img src={fav.background_image} alt="" />
              <div className="container-icon">
                <i
                  onClick={() => {
                    removeFav(index);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </div>
              <h2 className="game-title-fav">{fav.name}</h2>;
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Favorite;
