import "./MovieCard.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/film/${movie.id}`);
  };

  return (
    <div className="card-container">
      <div className="card-img-container" onClick={handleClick}>
        <img src={movie.urls.small} className="card-img" />
      </div>
    </div>
  );
};

export default MovieCard;
