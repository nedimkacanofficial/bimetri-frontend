import React from 'react'
import UserTemplate from '../../templates/user-template'
import Home from '../../components/home-page/home';

const HomePage = () => {
  return (
    <UserTemplate>
      <div
        className="row justify-content-center pt-2 pb-3"
        style={{ minHeight: "calc(100vh - 100px)", margin: 0 }}
      >
        <div className="col-10">
          <h2 className="text-center">Welcome to Bimetri</h2>
          <Home />
        </div>
      </div>
    </UserTemplate>
  );
}

export default HomePage
