import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../../components/header/header";
import Axios from "../../../helpers/axios";
import { isEmpty } from "../../../helpers/utile";
import "./Login.css";

export const Login = () => {
  const [inputValue, setInputValue] = useState({});
  const history = useHistory();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isEmpty(inputValue?.phone) || isEmpty(inputValue?.password)) {
      alert("please enter field");
      return;
    }

    const data = {
      phone: inputValue?.phone,
      password: inputValue?.password,
    };
    await Axios.post(`user/login`, data)
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res?.data?.payload?.user));
        localStorage.setItem("token", JSON.stringify(res?.data?.payload?.token));
        history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    return () => {
      setInputValue({});
    };
  }, []);

  return (
    <div>
      {/* <Header /> */}
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
          <form onSubmit={handleLogin}>
            <div className="login-content">
              <h1>Login</h1>
              <label htmlFor="username">Phone :</label>
              <input
                type="text"
                id="username"
                placeholder="Enter Phone..."
                name="phone"
                onChange={handleOnChange}
                value={inputValue?.phone}
              />
              <label htmlFor="pass">Password :</label>
              <input
                type="password"
                id="pass"
                placeholder="Enter Password..."
                name="password"
                onChange={handleOnChange}
                value={inputValue?.password}
              />
              <button onClick={handleLogin} className="login-button" id="login-btn">
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
          </form>
        </div>
      </div>
    </div>
  );
};
