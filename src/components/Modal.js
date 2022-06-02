import React from "react";
import "./modal.css";
import axios from "axios";

const Modal = ({
  closeModal,
  reviewTitle,
  setReviewTitle,
  review,
  setReview,
  editing,
  setEditing,
  idReview,
  setDataUpdate,
  setNewReview,
  token,
}) => {
  // console.log(token);
  const handleReviewTitle = (event) => {
    const value = event.target.value;
    setReviewTitle(value);
  };

  const handleReview = (event) => {
    const value = event.target.value;
    setReview(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/review/create",
        {
          reviewTitle: reviewTitle,
          review: review,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setNewReview(response.data);
      closeModal(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  // console.log("notre id =>", idReview);
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/review/update", {
        _id: idReview,
        reviewTitle: reviewTitle,
        review: review,
      });
      console.log(response.data);
      setDataUpdate(response.data);
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button
          className="btn-close"
          onClick={() => {
            closeModal(false);
          }}
        >
          X
        </button>
        <div className="title">
          <h1>Write a Review</h1>
        </div>
        <div className="container-review">
          <form onSubmit={editing ? handleUpdate : handleSubmit}>
            <p>Review title</p>
            <input
              type="text"
              id="review-title"
              name="reviewTitle"
              value={reviewTitle}
              onChange={handleReviewTitle}
            />
            <p>Review</p>
            <textarea
              id="review"
              name="review"
              value={review}
              onChange={handleReview}
            />
            <br />
            <button type="submit" className="btn-publish">
              {editing ? "Update" : "Publish"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
