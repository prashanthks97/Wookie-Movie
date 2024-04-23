import React from "react";
import "../Styles/MovieCard.css";
import { useNavigate } from "react-router-dom";

const ViewSearch = ({ searchresult }) => {
  const navigate = useNavigate();
  return (
    <div className="viewpage">
      <div className="moviecard">
        <div className="card-row">
          <div className="card-row_posters">
            {searchresult?.searchMovie?.length !== 0 &&
              searchresult?.searchMovie?.map((movie) => {
                return (
                  <img
                    onClick={() => navigate(`/playmovie?id=${movie?._id}`)}
                    src={movie?.poster}
                    alt="card"
                    className="card-row_poster card-row_posterLarge"
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSearch;
