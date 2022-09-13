import React, { useState } from "react";
import Header from "../../components/header/header";
import "./searchMovie.css";
import { BsStarFill, BsStar } from "react-icons/bs";

const SearchMovie = () => {
  const [addToPlaylist, setAddToPlaylist] = useState(false);

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
      </div>
    </div>
  );
};

export default SearchMovie;
