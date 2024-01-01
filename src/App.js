import React from "react";
import { ComplexNavbar } from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./Components/Posts";
import CreatePost from "./Components/CreatePost";
import SinglePost from "./Components/SinglePost";
import { useContext } from "react";
import { UserContext } from "./Context/Context";
import { SignUp } from "./Components/SignUp";
import { Login } from "./Components/Login";
import MyPost from "./Components/MyPost";

function App() {

  return (
    <>
      <BrowserRouter>
        <ComplexNavbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypost" element={<MyPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
