import React from "react";
import { Route } from "react-router-dom";
import Home from "./home/home";
import Playlist from "./playlist/playlist";
import SearchMovie from "./searchMovie/searchMovie";
import { Login } from "./User/Login/Login";
import { SignUp } from "./User/Sign-Up/SignUp";

const Router = () => {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/searchMovie" component={SearchMovie} />
      <Route exact path="/playlist" component={Playlist} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
    </>
  );
};

export default Router;
