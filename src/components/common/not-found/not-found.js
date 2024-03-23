import React from "react";
import { Link } from "react-router-dom";
import "./custom-style.css";

const NotFound = () => {
  return (
    <>
      <section class="page">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="col-sm-10 col-sm-offset-1 text-center">
                <div class="bg">
                  <h1 class="text-center">404</h1>
                </div>
                <div class="content_box">
                  <h3 class="h3">Look like you're lost</h3>
                  <p>the page you are looking for not available!</p>
                  <Link to={"/"} class="link">
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
