import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Axios } from "./Data/Axios";
import LoginPage from "./Screens/LoginPage";
import MoviePage from "./Screens/MoviePage";
import RegistrationPage from "./Screens/RegistrationPage";
import PageNotFound from "./Screens/PageNotFound";
import MainCard from "./Components/MainCard/MainCard";
import Navbar from "./Components/NavBar/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  const [search, setSearch] = useState("");
  const [searchresult, setSearchResult] = useState([]);

  useEffect(() => {
    if (search?.length > 2) {
      const apiCall = async (id) => {
        try {
          const response = await Axios.get(`/search/${search}`);
          setSearchResult(response.data);
          console.log(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      apiCall();
    }
  }, [search]);
  return (
    <div className="App">
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route
          path="/movies"
          element={
            <MoviePage
              search={search}
              setSearch={setSearch}
              searchresult={searchresult}
              setSearchResult={setSearchResult}
            />
          }
        />
        <Route path="/playmovie" element={<MainCard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
