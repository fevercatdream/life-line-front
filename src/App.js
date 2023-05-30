import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage/index.js';
import Timeline from './pages/timeline/Timeline.js';
import Profile from './pages/profile/Profile.js';
import Friends from './pages/friends/Friends.js';
import Signup from './pages/signup/Signup.js';
import './style.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
    <footer className="footer">
        <nav className="footerNav">
          <p className="footLinks">Sign Up</p>
          <p className="footLinks">Log In</p>
          <p className="footLinks">About</p>
          <p className="footLinks">Developers</p>
        </nav>
        <p className="copyright">Meta © 2023 Life Line</p>
    </footer>
    </>
  );
}

export default App;