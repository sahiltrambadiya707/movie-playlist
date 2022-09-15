import React, { useState } from "react";
import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import Header from "../components/header/header";
import Home from "./home/home";
import Playlist from "./playlist/playlist";
import PlaylistMovie from "./playlistMovie/playlistMovie";
import SearchMovie from "./searchMovie/searchMovie";
import { Login } from "./User/Login/Login";
import { SignUp } from "./User/Sign-Up/SignUp";

const Router = () => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, []);
  return (
    <>
      <Header userInfo={userInfo} />
      <Route exact path="/" component={Home} />
      <Route exact path="/searchMovie" component={SearchMovie} />
      <RouteWrapper exact path="/playlist" component={Playlist} />
      <Route exact path="/user/paylist/:id" component={PlaylistMovie} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
    </>
  );
};

function RouteWrapper({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        JSON.parse(localStorage.getItem("userInfo"))?.phone ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default Router;
