import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../Components/NavBar/Navbar";
import "../Styles/MoviePage.css";
// import MainCard from "../Components/MainCard/MainCard";
import MovieCard from "../Components/MovieCard/MovieCard";
import ViewSearch from "../Components/ViewSearch";
// import { Axios } from "../Data/Axios";

const MoviePage = ({ search, setSearch, searchresult, setSearchResult }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("signedJWT");
    if (!token) {
      navigate("/");
    }
  });

  return (
    <div className="moviepage">
      {search?.length === 0 && (
        <>
          <MovieCard />
        </>
      )}
      {search?.length !== 0 && <ViewSearch searchresult={searchresult} />}
    </div>
  );
};

export default MoviePage;
