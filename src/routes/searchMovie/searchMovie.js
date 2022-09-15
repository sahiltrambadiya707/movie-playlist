import React, { useState } from "react";
import Header from "../../components/header/header";
import "./searchMovie.css";
import { BsStarFill, BsStar } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Axios from "../../helpers/axios";
import { useEffect } from "react";

const SearchMovie = () => {
  const [addToPlaylist, setAddToPlaylist] = useState(false);
  const [search, setSearch] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [allPlaylist, setAllPlaylist] = useState([]);
  const [PlaylistId, setPlaylistId] = useState("6320b467ce6c1361308df2aa");
  const [userInfo, setUserInfo] = useState({});
  const [popUpExit, setPopUpExit] = useState();

  useEffect(() => {
    getPlaylist();
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  const getMovie = async (e) => {
    e.preventDefault();
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?&api_key=f299abb18fc11a815b1d611071582036&query=${search}`
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

  const addMovie = async (e, movie) => {
    e.preventDefault();
    const data = {
      playlist: PlaylistId,
      movieName: movie?.title,
      moviePoster: movie?.poster_path,
      movieId: movie?.id,
    };
    await Axios.post(`movie/create`, data)
      .then((res) => {
        setSearch("");
        setAllMovies(res?.data?.results);
      })
      .catch((err) => {
        console.log(err);
        setSearch("");
      });
  };
  const exitOnClick = () => {
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
                            onClick={(e) => addMovie(e, movie)}
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
