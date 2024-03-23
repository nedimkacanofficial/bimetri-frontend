import React from "react";
import Header from "../components/common/header/header";
import Footer from "../components/common/footer/footer";

const UserTemplate = ({ children }) => {
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <div style={{ flex: 0 }}>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default UserTemplate;
