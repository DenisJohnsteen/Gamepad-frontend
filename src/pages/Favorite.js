import "./favorite.css";

const Favorite = ({ favorite, setFavorite }) => {
  console.log(favorite);

  const removeFav = (index) => {
    const tab = [...favorite];
    tab.splice(index, 1);
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
                <i onClick={removeFav} className="fa-solid fa-trash"></i>
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
