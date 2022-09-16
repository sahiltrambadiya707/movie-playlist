import React, { useState } from "react";
import Header from "../../components/header/header";
import "./searchMovie.css";
import { BsStarFill, BsStar } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Axios from "../../helpers/axios";
import { useEffect } from "react";
import { isEmpty } from "../../helpers/utile";

const SearchMovie = () => {
  const [addToPlaylist, setAddToPlaylist] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [selectdMovieData, setSelectdMovieData] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [allPlaylist, setAllPlaylist] = useState([]);
  const [PlaylistId, setPlaylistId] = useState("");
  const [popUpExit, setPopUpExit] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPlaylist();
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    return () => {
      handleClose();
    };
  }, []);

  const handleClose = () => {
    setAddToPlaylist(false);
    setUserInfo({});
    setSelectdMovieData({});
    setAllMovies([]);
    setAllPlaylist([]);
    setPlaylistId("");
    setSearch("");
  };

  const getMovie = async (e) => {
    e.preventDefault();
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=f299abb18fc11a815b1d611071582036&query=${search}&include_adult=false`
      )
      .then((res) => {
        setSearch("");
        setAllMovies(res?.data?.results);
      })
      .catch((err) => {
        console.log(err);
        setSearch("");
      });
  };

  const getPlaylist = async () => {
    await Axios.get("playlist/byUser")
      .then((res) => {
        setAllPlaylist(res?.data?.payload?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addMovie = async (e, movie, Playlist) => {
    e.preventDefault();
    const data = {
      playlist: Playlist,
      movieName: movie?.title,
      moviePoster: movie?.poster_path,
      movieId: movie?.id,
    };

    if (
      isEmpty(data.playlist) ||
      isEmpty(data.movieName) ||
      isEmpty(data.moviePoster) ||
      isEmpty(data.movieId)
    ) {
      alert("Someting Went Worng Please Try Again...!");
      setAddToPlaylist(false);
      setPlaylistId("");
      setSelectdMovieData("");
      return;
    }

    await Axios.post(`movie/create`, data)
      .then((res) => {
        setAddToPlaylist(false);
        setPlaylistId("");
        setSelectdMovieData("");
      })
      .catch((err) => {
        setAddToPlaylist(false);
        setPlaylistId("");
        setSelectdMovieData("");
      });
  };

  const exitOnClick = () => {
    setPlaylistId("");
    setSelectdMovieData("");
    setPopUpExit("add-to-pop-up-exit-animation");
    setTimeout(() => {
      setAddToPlaylist(false);
      setPopUpExit("");
    }, 300);
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="search-movie-page-container">
        <form onSubmit={getMovie}>
          <div className="search-bar-container">
            <input
              type="search"
              className="search-bar"
              placeholder="Search here..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button className="search-button" onClick={getMovie}>
              Search
            </button>
          </div>
        </form>
        <div className="movie-cards-container">
          {allMovies?.length > 0 &&
            allMovies?.map((movie) => {
              return (
                <>
                  {movie?.poster_path && (
                    <div className="card">
                      <h1>{movie?.title}</h1>
                      <img src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`} alt="" />
                      {userInfo?.phone && (
                        <div className="add-to-playlist-button">
                          <div
                            className="switch-stars-container"
                            onClick={(e) => {
                              setSelectdMovieData(movie);
                              setAddToPlaylist(true);
                            }}
                          >
                            <FaPlus />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              );
            })}
        </div>
        {addToPlaylist && (
          <div className="add-to-playlist-pop-up" id={popUpExit}>
            <h1>Add to...</h1>
            <hr />
            <ol>
              {allPlaylist?.length > 0 ? (
                allPlaylist?.map((res, i) => {
                  return (
                    <li key={i}>
                      <label htmlFor={i}>{res?.playlistName}</label>{" "}
                      <input
                        type="radio"
                        name="playlist"
                        value={res?._id}
                        id={i}
                        onChange={(e) => setPlaylistId(e.target.value)}
                      />
                    </li>
                  );
                })
              ) : (
                <div></div>
              )}
            </ol>
            <div className="add-cancel-buttons">
              <button
                onClick={(e) => {
                  addMovie(e, selectdMovieData, PlaylistId);
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
