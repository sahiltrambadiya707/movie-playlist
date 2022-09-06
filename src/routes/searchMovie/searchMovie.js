import React from "react";
import Header from "../../components/header/header";
import "./searchMovie.css";

const SearchMovie = () => {
  return (
    <>
      <Header />
      <div class="search-container">
        <div class="search-input">
          <input type="text" class="input" placeholder="Search" />
        </div>
        <div class="search-button">
          <button class="buttons">Button</button>
        </div>
      </div>
      <div className="container">
        {[1, 2, 3, 4, 5, 6, 7].map((res) => {
          return (
            <div class="card-container">
              <div class="card" style={{ width: "18rem;" }}>
                {/* <img src="..." class="card-img-top" alt="..." /> */}
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make up the bulk of the
                    card's content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchMovie;
