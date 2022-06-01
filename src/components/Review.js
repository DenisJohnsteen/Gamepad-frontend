import { useEffect, useState } from "react";
import axios from "axios";
import "./review.css";

const Review = ({
  idReview,
  setIdReview,
  setOpenModal,
  newReview,
  dataUpdate,
  setEditing,
  deleteReview,
  setDeleteReview,
}) => {
  const [dataReview, setDataReview] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/getlistofreview"
        );
        console.log(response.data);
        setDataReview(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [newReview, dataUpdate, deleteReview]);

  const handleDelete = async () => {
    try {
      const response = await axios.post("http://localhost:4000/review/delete", {
        _id: idReview,
      });
      console.log(response.data);
      setDeleteReview(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <p>En cour de chargement...</p>
  ) : (
    <div className="container-reviews">
      {dataReview.map((review) => {
        // console.log(review._id);
        return (
          <div key={review._id} className="container-review">
            <h2>{review.reviewTitle}</h2>
            <p>{review.review}</p>
            <button
              onClick={() => {
                setIdReview(review._id);
                setEditing(true);
                setOpenModal(true);
              }}
            >
              update
            </button>
            <button
              onClick={() => {
                handleDelete();
                setIdReview(review._id);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Review;
