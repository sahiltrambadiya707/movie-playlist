import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/header/header";
import "./SignUp.css";

export const SignUp = () => {
  return (
    <div>
      <Header />
      <div className="sign-up-page-container">
        <div className="sign-up-page-background">
          <div className="shape-one"></div>
          <div className="shape-two"></div>
          <div className="shape-three">
            <div></div>
          </div>
          <div className="shape-four">
            <div></div>
          </div>
          <div className="sign-up-form-container">
            <div className="sign-up-form-content">
              <h1>Sign Up</h1>
              <label htmlFor="name">Name :</label>
              <div className="tooltip-container">
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Enter Your Name"
                />
              </div>
              <label htmlFor="name">Phone No :</label>
              <div className="tooltip-container">
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Enter Your Phone Number"
                />
              </div>
              <label htmlFor="name">Email :</label>
              <div className="tooltip-container">
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Enter Your Email"
                />
              </div>
              <label htmlFor="name">Password :</label>
              <div className="tooltip-container">
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Set Your Password"
                />
              </div>
              <button>Sign Up</button>
              <p>
                Already Have Account? |{" "}
                <Link to={"/login"} className="link-to-redirect">
                  Login
                </Link>
                ...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
