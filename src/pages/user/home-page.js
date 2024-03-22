import React from 'react'
import UserTemplate from '../../templates/user-template'
import Home from '../../components/home-page/home';
import Image from "../../assets/image/bienport_logo.png";

const HomePage = () => {
  return (
    <UserTemplate>
      <div
        className="row justify-content-center pt-2 pb-3"
        style={{ minHeight: "calc(100vh - 100px)", margin: 0 }}
      >
        <div className="col-10 text-center">
          <h2 className="text-center">Welcome to Bimetri</h2>
          <img
            src={Image}
            alt="Description"
            style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
          />
          <Home />
        </div>
      </div>
    </UserTemplate>
  );
}

export default HomePage
