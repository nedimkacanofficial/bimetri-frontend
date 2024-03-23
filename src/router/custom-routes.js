import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/user/home-page";
import StudentPage from "../pages/user/student-page";
import NotFoundPage from "../pages/common/not-found-page";
import CoursePage from "../pages/user/course-page";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="courses" element={<CoursePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
