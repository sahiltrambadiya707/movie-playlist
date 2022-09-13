import React from "react";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import "./header.css";

const Header = () => {
  return (
    <div style={{ background: "rgb(236, 236, 236)" }}>
      <div className="header-container">
        <div className="main-logo">
          <h1>Movie</h1>
        </div>
        <div className="navlist">
          <li>
            <Link className="navlinks" to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="navlinks" to={"/searchMovie"}>
              Search Movie
            </Link>
          </li>
          <li>
            <Link className="navlinks" to={"/playlist"}>
              User-Playlist
            </Link>
          </li>
          <li>
            <Link className="navlinks" to={"/login"}>
              Login
            </Link>
          </li>
          <li>
            <Link className="navlinks" to={"/sign-up"}>
              Sign-up
            </Link>
          </li>
        </div>
      </div>
      <div className="header-shadow"></div>
    </div>
  );
};

export default Header;
