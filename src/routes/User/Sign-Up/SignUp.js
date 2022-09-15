import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../../components/header/header";
import Axios from "../../../helpers/axios";
import { isEmpty } from "../../../helpers/utile";
import "./SignUp.css";

export const SignUp = () => {
  const [inputValue, setInputValue] = useState({});
  const history = useHistory();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (
      isEmpty(inputValue?.email) ||
      isEmpty(inputValue?.phone) ||
      isEmpty(inputValue?.name) ||
      isEmpty(inputValue?.password)
    ) {
      alert("please enter field");
      return;
    }

    const data = {
      email: inputValue?.email,
      phone: inputValue?.phone,
      name: inputValue?.name,
      password: inputValue?.password,
    };
    await Axios.post(`user/sign-up`, data)
      .then((res) => {
        history.push("/login");
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
            <form onSubmit={handleSignUp}>
              <div className="sign-up-form-content">
                <h1>Sign Up</h1>
                <label htmlFor="name">Name :</label>
                <div className="tooltip-container">
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Your Name"
                    name="name"
                    onChange={handleOnChange}
                    value={inputValue?.name}
                  />
                </div>
                <label htmlFor="name">Phone No :</label>
                <div className="tooltip-container">
                  <input
                    type="text"
                    name="phone"
                    id="name"
                    placeholder="Enter Your Phone Number"
                    onChange={handleOnChange}
                    value={inputValue?.phone}
                  />
                </div>
                <label htmlFor="name">Email :</label>
                <div className="tooltip-container">
                  <input
                    type="text"
                    name="email"
                    id="name"
                    placeholder="Enter Your Email"
                    onChange={handleOnChange}
                    value={inputValue?.email}
                  />
                </div>
                <label htmlFor="name">Password :</label>
                <div className="tooltip-container">
                  <input
                    type="text"
                    name="password"
                    id="name"
                    placeholder="Set Your Password"
                    onChange={handleOnChange}
                    value={inputValue?.password}
                  />
                </div>
                <button onClick={handleSignUp}>Sign Up</button>
                <p>
                  Already Have Account? |{" "}
                  <Link to={"/login"} className="link-to-redirect">
                    Login
                  </Link>
                  ...
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
