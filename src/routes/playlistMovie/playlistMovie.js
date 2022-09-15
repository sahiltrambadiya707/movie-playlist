import React, { useState } from "react";
import Header from "../../components/header/header";
import "./playlistMovie.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Axios from "../../helpers/axios";

const PlaylistMovie = () => {
  // const [addToPlaylist, setAddToPlaylist] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    await Axios.get(`movie/byUser/${id}`)
      .then((res) => {
        setAllMovies(res?.data?.payload?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="search-movie-page-container">
        <div className="movie-cards-container">
          {allMovies?.length > 0 &&
            allMovies?.map((movie) => {
              return (
                <>
                  <div className="card">
                    <h1>{movie?.movieName}</h1>
                    <img src={`https://image.tmdb.org/t/p/w200${movie?.moviePoster}`} alt="" />
                    {/* <div className="add-to-playlist-button">
                      <div className="switch-stars-container"></div>
                    </div> */}
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PlaylistMovie;
