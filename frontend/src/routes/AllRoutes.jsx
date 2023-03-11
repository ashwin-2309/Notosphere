import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import SignupPage from "../pages/SignupPage";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />}></Route>
      <Route path='/register' element={<SignupPage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/notes' element={<NotesPage />}></Route>
    </Routes>
  );
};

export default AllRoutes;
