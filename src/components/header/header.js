import React from "react";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import "./header.css";

const Header = (props) => {
  const { userInfo } = props;
  return (
    <div style={{ background: "rgb(236, 236, 236)" }}>
      <div className="header-container">
        <Link to="/" className="main-logo">
          <h1>Movie-Playlist</h1>
        </Link>

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
          {userInfo?.phone ? (
            <>
              <li>
                <Link className="navlinks" to={"/playlist"}>
                  Your-Playlist
                </Link>
              </li>
              <li
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                <div>Logout</div>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      <div className="header-shadow"></div>
    </div>
  );
};

export default Header;
