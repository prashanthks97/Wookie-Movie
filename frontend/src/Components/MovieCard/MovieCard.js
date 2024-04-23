import React, { useState, useEffect } from "react";
import "../../Styles/MovieCard.css";
import { Axios } from "../../Data/Axios";
import { useNavigate } from "react-router-dom";

const MovieCard = () => {
  const [genere, setGenere] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const apiCall = async (id) => {
      try {
        const response = await Axios.get("/home");
        setGenere(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    apiCall();
  }, []);
  return (
    <>
      <div className="moviecard">
        {/* Trending Now */}
        <div className="card-row">
          {genere?.emtArr?.map((gn) => {
            return (
              <>
                <h2>{gn.category}</h2>
                <div className="card-row_posters">
                  {gn?.movies?.map((img) => {
                    return (
                      <img
                        onClick={() => navigate(`/playmovie?id=${img?._id}`)}
                        src={img?.poster}
                        alt="card"
                        className="card-row_poster card-row_posterLarge"
                      />
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MovieCard;
