import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import "./details.css";
import Modal from "../components/Modal";
import Review from "../components/Review";
import Cookies from "js-cookie";

const Details = ({ favorite, setFavorite, handleFavorite }) => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(false);
  const [idReview, setIdReview] = useState();
  const [newReview, setNewReview] = useState();
  const [dataUpdate, setDataUpdate] = useState();
  const [deleteReview, setDeleteReview] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=2092a1dbb9c246d3871f108928ae56fa`
        );
        // console.log(response.data);
        setData(response.data);
        const response2 = await axios.get(`
        https://api.rawg.io/api/games/${id}/game-series?key=2092a1dbb9c246d3871f108928ae56fa`);
        console.log(response2.data);
        setData2(response2.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  // const addFavorite = () => {
  //   const tab = [...favorite];
  //   tab.push(data);
  //   setFavorite(tab);
  // };

  const addFavorite = () => {
    const tab = [...favorite];
    tab.push(data);
    handleFavorite(tab);
    // const tabString = JSON.stringify(tab);
    // console.log(tabString);
    // Cookies.set("favorite", tabString);
    // const returnToTab = JSON.parse(tabString);
    // console.log(returnToTab);
    // setFavorite(tab);
    // console.log(dataFav);
  };

  return isLoading ? (
    <p>en cours de chargement...</p>
  ) : (
    <div className="container-details">
      <h1>{data.name}</h1>
      <div className="container-column12">
        <div className="column1">
          <img className="details-img" src={data.background_image} alt="" />
        </div>
        <div className="column2">
          <div className="container-btn-favandreview">
            <div className="container-btn-fav">
              <button className="btn-fav" onClick={addFavorite}>
                Saved to collection
              </button>
              <i
                style={{ color: "white" }}
                className="fa-solid fa-bookmark"
              ></i>
            </div>
            <div
              className="container-btn-review"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <button className="btn-review">Add a review</button>
              <i style={{ color: "white" }} className="fa-solid fa-message"></i>
            </div>
          </div>
          <div className="container-column34">
            <div className="column3">
              <p>Platforms</p>
              {data.metacritic_platforms.map((platforms, index) => {
                // console.log(platforms);
                return <span key={index}>{platforms.platform.name},</span>;
              })}
              <p>Released date</p>
              <span>{data.released}</span>
              <p>Publisher</p>
              {data.publishers.map((publisher, index) => {
                return <span key={index}>{publisher.name},</span>;
              })}
            </div>
            <div className="column4">
              <p>Genre</p>
              {data.genres.map((genre, index) => {
                return <span key={index}>{genre.name}</span>;
              })}
              <p>Developer</p>
              {data.developers.map((developer, index) => {
                return <span key={index}>{developer.name}</span>;
              })}
              <p>Age Rating</p>
              <span>{data.esrb_rating.name}</span>
            </div>
          </div>
          <div className="container-description">
            <p>Description</p>
            <p className="description">{data.description}</p>
          </div>
        </div>
      </div>

      <div className="section2">
        {data2.results.map((item, index) => {
          const id = item.id;
          return (
            <div className="container-game-series" key={index}>
              <Link to={`/details/${id}`}>
                <img
                  className="game-image-series"
                  src={item.background_image}
                  alt=""
                />
              </Link>
              <h2 className="game-title-series">{item.name}</h2>;
            </div>
          );
        })}
      </div>
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          reviewTitle={reviewTitle}
          setReviewTitle={setReviewTitle}
          review={review}
          setReview={setReview}
          reviews={reviews}
          setReviews={setReviews}
          editing={editing}
          setEditing={setEditing}
          idReview={idReview}
          dataUpdate={dataUpdate}
          setNewReview={setNewReview}
          setDataUpdate={setDataUpdate}
        />
      )}
      <Review
        reviews={reviews}
        editing={setEditing}
        setEditing={setEditing}
        idReview={idReview}
        setIdReview={setIdReview}
        setOpenModal={setOpenModal}
        newReview={newReview}
        dataUpdate={dataUpdate}
        deleteReview={deleteReview}
        setDeleteReview={setDeleteReview}
      />
    </div>
  );
};

export default Details;
