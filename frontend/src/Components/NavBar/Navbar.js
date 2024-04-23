import React from "react";
import "../../Styles/Navbar.css";
import { useLocation } from "react-router-dom";

const Navbar = ({ search, setSearch }) => {
  const location = useLocation();
  const routePath = location.pathname;
  console.log(routePath);

  return (
    <div>
      {routePath !== "/" && routePath !== "/registration" && (
        <>
          <header className="header">
            <div className="navbar">
              {/* logo */}
              <a href="/movies" className="logo">
                WOOKIE <span>MOVIES</span>
              </a>
              {/* searchbox */}
              <div className="search-box">
                <span className="search-icon">&#128270;</span>
                <input
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                  type="text"
                  className="search-input"
                  placeholder="Search..."
                />
              </div>
            </div>
          </header>
        </>
      )}
    </div>
  );
};

export default Navbar;
