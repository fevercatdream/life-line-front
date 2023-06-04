import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage/index.js';
// import Timeline from './pages/timeline/Timeline.js';
import Profile from './pages/profile/Profile.js';
import Friends from './pages/friends/Friends.js';
import Signup from './pages/signup/Signup.js';
import Users from './pages/users/Users.js';
import Ignored from './pages/ignored/Ignored.js';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/friends" element={<Friends/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/ignored" element={<Ignored/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;