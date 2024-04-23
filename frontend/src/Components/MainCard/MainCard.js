import React, { useEffect, useState } from "react";
import "../../Styles/MovieCard.css";
import { useLocation } from "react-router-dom";
import { Axios } from "../../Data/Axios";
import Modal from "react-modal";
import ReactPlayer from "react-player";

const customStyles = {
  content: {
    backgroundColor: "black",
    top: "50%",
    left: "50%",
    right: "auto",
    padding: "1px",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const MainCard = () => {
  const [movieresult, setMovieResult] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);

  let openModal = () => {
    setIsOpen(true);
  };

  let closeModal = () => {
    setIsOpen(false);
  };

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const paramValue = queryParams.get("id");

  useEffect(() => {
    const apiCall = async (id) => {
      try {
        const response = await Axios.get(`/movie/${paramValue}`);
        setMovieResult(response?.data?.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    apiCall();
  }, );

  const backgroundImageUrl = movieresult?.backdrop || "";

  const mainBanner = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    color: "white",
    objectFit: "contain",
    height: "100vh",
    overflowX: "hidden",
    overflowY: "hidden",
  };
  return (
    <div className="card-banner" style={mainBanner}>
      <div className="card-banner_contents">
        <h1 className="card-banner_title">{movieresult?.title}</h1>
        <div className="card-banner_buttons">
          <button onClick={openModal} className="card-banner_button">
            Play
          </button>
          <button className="card-banner_button">{movieresult?.length}</button>
          {movieresult?.genres?.map((gen) => {
            return <button className="card-banner_button">{gen}</button>;
          })}
          <div style={{ display: "flex" }}>
            <p className="card-links">
              {movieresult?.imdb_rating}&nbsp;<span>/</span>&nbsp;
              {movieresult?.classification}&nbsp;<span>/</span>&nbsp;
              {movieresult?.director}&nbsp;<span>/</span>&nbsp;
              {movieresult?.cast}&nbsp;
            </p>
          </div>
        </div>
        <div className="card-banner_description">{movieresult?.overview}</div>
      </div>
      <div className="card-banner_fadeBottom"></div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "5px",
            float: "right",
            marginBottom: "5px",
          }}
          onClick={closeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
          </svg>
        </button>
        <ReactPlayer url="<https://www.youtube.com/watch?v=6wPCjwNTPX4>" />
      </Modal>{" "}
    </div>
  );
};

export default MainCard;
