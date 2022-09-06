import React from "react";
import { Route } from "react-router-dom";
import Home from "./home/home";
import Playlist from "./playlist/playlist";
import SearchMovie from "./searchMovie/searchMovie";

const Router = () => {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/searchMovie" component={SearchMovie} />
      <Route exact path="/playlist" component={Playlist} />
    </>
  );
};

export default Router;
