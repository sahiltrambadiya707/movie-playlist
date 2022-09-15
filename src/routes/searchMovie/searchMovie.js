import React, { useState } from "react";
import Header from "../../components/header/header";
import "./searchMovie.css";
import { BsStarFill, BsStar } from "react-icons/bs";

const SearchMovie = () => {
  const [addToPlaylist, setAddToPlaylist] = useState(false);
  const [popUpExit, setPopUpExit] = useState();

  const exitOnClick = () => {
    setPopUpExit("add-to-pop-up-exit-animation");
    setTimeout(() => {
      setAddToPlaylist(false);
      setPopUpExit("");
    }, 300);
  };

  return (
    <div>
      <Header />
      <div className="search-movie-page-container">
        <div className="search-bar-container">
          <input type="search" className="search-bar" />
          <button className="search-button">Search</button>
        </div>
        <div className="movie-cards-container">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => {
            return (
              <div className="card">
                <img src="download.jpg" alt="" />
                <h1>Movie Name</h1>
                <div className="add-to-playlist-button">
                  <div className="switch-stars-container">
                    {addToPlaylist ? (
                      <BsStarFill
                        className="filled-star"
                        onClick={() => setAddToPlaylist(false)}
                      />
                    ) : (
                      <BsStar
                        className="empty-star"
                        onClick={() => setAddToPlaylist(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {addToPlaylist && (
          <div className="add-to-playlist-pop-up" id={popUpExit}>
            <h1>Add to...</h1>
            <hr />
            <ol>
              <li>
                <label htmlFor="pOne">XYZ PLAYLIST NAME</label>{" "}
                <input type="radio" name="playlist" id="pOne" />
              </li>
              <li>
                <label htmlFor="pTwo">XYZ PLAYLIST NAME</label>{" "}
                <input type="radio" name="playlist" id="pTwo" />
              </li>
              <li>
                <label htmlFor="pThree">XYZ PLAYLIST NAME</label>{" "}
                <input type="radio" name="playlist" id="pThree" />
              </li>
              <li>
                <label htmlFor="pFour">XYZ PLAYLIST NAME</label>{" "}
                <input type="radio" name="playlist" id="pFour" />
              </li>
              <li>
                <label htmlFor="pFive">XYZ PLAYLIST NAME</label>{" "}
                <input type="radio" name="playlist" id="pFive" />
              </li>
            </ol>
            <div className="add-cancel-buttons">
              <button
                onClick={() => {
                  console.log("Clicked");
                }}
              >
                Add
              </button>
              <button onClick={() => exitOnClick()}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMovie;
