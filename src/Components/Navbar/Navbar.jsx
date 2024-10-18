import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MediaContext } from "../../Context/MediaContext";

export default function Navbar({ userData, logOut }) {
  let { handleSearchItems, type } = useContext(MediaContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg position-fixed start-0 end-0 top-0 z-3 p-2 p-0">
        <div className="container-fluid pe-0">
          <div className="row w-100 d-flex justify-content-center align-items-center">
            <div className="col-lg-2 col-md-12 d-flex justify-content-between justify-content-lg-end align-items-center pe-lg-4">
              <Link to={"/"}>
                <h1 className="nav-title d-flex justify-content-center align-items-center h3 m-0 ps-2 pb-2 cursor-pointer">
                  <span className="arc-title">
                    <span className="arc-letter title-cine">C</span>
                    <span className="arc-letter title-cine">i</span>
                    <span className="arc-letter title-cine">n</span>
                    <span className="arc-letter title-cine">e</span>
                    <span className="arc-letter title-flex">F</span>
                    <span className="arc-letter title-flex">l</span>
                    <span className="arc-letter title-flex">i</span>
                    <span className="arc-letter title-flex">x</span>
                  </span>
                </h1>
              </Link>
              {isMobile && (
                <div className="d-flex align-items-center ms-auto me-4">
                  <i className="cursor-pointer fab mx-1 fa-facebook"></i>
                  <i className="cursor-pointer fab mx-1 fa-spotify"></i>
                  <i className="cursor-pointer fab mx-1 fa-instagram"></i>
                  <i className="cursor-pointer fab mx-1 fa-youtube"></i>
                </div>
              )}
              <button
                className="navbar-toggler text-muted"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <i className="fa-solid fa-bars text-muted"></i>
              </button>
            </div>
            <div className="col-lg-5 col-md-12">
              {userData ? (
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item nav-link">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item nav-link">
                      <Link to="movies">Movies</Link>
                    </li>
                    <li className="nav-item nav-link">
                      <Link to="tv">Tv Series</Link>
                    </li>
                    <li className="nav-item nav-link">
                      <Link to="people">Actors</Link>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-5 col-md-4 mt-3 mt-md-0 mb-2 mb-md-0 d-flex align-items-center ps-0 pe-md-3 pe-0 justify-content-end">
              <div className={`col-lg-6 col-md-12 w-50 ${isMobile? 'w-75' : ''} me-1 me-md-0 ms-2`}>
                {(userData && type == "movie") ||
                type == "tv" ||
                type == "person" ? (
                  <>
                    <form
                      onSubmit={(e) => handleSearchItems(e, type)}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="search-container d-flex position-relative justify-content-center align-items-center">
                      {/* <input className={`search-input position-absolute end-0 form-control rounded-3 ${isHovered? 'visible': ''}`} type="search" placeholder={`Search for ${type == 'movie'? 'Movies': type == 'tv'? 'TvS': type == 'person'? 'Actors':''} ...`}/> */}
                      <input
                        className={`search-input position-absolute end-0 form-control rounded-3 ${
                          isHovered || isMobile ? "visible" : ""
                        }`}
                        type="search"
                        placeholder={`Search for ${
                          type == "movie"
                            ? "Movies"
                            : type == "tv"
                            ? "TvS"
                            : type == "person"
                            ? "Actors"
                            : ""
                        } ...`}
                      />
                      <button className="search-btn position-absolute end-0 btn btn-info">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </form>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-6 col-md-12">
                <ul className="list-unstyled d-flex m-0">
                  {!isMobile && (
                    <div className="d-flex justify-content-center align-items-center px-lg-2">
                      <i className="cursor-pointer fab mx-1 fa-facebook"></i>
                      <i className="cursor-pointer fab mx-1 fa-spotify"></i>
                      <i className="cursor-pointer fab mx-1 fa-instagram"></i>
                      <i className="cursor-pointer fab mx-1 fa-youtube"></i>
                    </div>
                  )}
                  {userData ? (
                    <>
                      <li className="px-2">
                        {" "}
                        <Link to="profile">{userData.name}</Link>
                      </li>
                      <li className="ps-1 cursor-pointer" onClick={logOut}>
                        {" "}
                        <span>LogOut</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="px-2">
                        {" "}
                        <Link to="login">Login</Link>
                      </li>
                      <li className="px-2">
                        {" "}
                        <Link to="/register">Register</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
