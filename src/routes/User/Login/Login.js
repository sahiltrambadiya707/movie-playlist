import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/header/header";
import "./Login.css";

export const Login = () => {
  return (
    <div>
      <Header />
      <div className="login-page-container">
        <div className="shape-one"></div>
        <div className="shape-two"></div>
        <div className="shape-three">
          <div></div>
        </div>
        <div className="shape-four">
          <div></div>
        </div>
        <div className="login-container">
          <div className="login-content">
            <h1>Login</h1>
            <label htmlFor="username">Username :</label>
            <input type="text" id="username" placeholder="Enter Username..." />
            <label htmlFor="pass">Password :</label>
            <input
              type="password"
              name=""
              id="pass"
              placeholder="Enter Password..."
            />
            <button className="login-button" id="login-btn">
              Login
            </button>
            <p>
              Don't Have An Account? |{" "}
              <Link to={"/sign-up"} className="link-to-redirect">
                Sign-Up
              </Link>
              ...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
