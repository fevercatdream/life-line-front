import React from "react";
import {Routes, Route, HashRouter} from "react-router-dom";
import Homepage from './pages/homepage/index.js';
import Timeline from './pages/timeline/Timeline.js';
import Profile from './pages/profile/Profile.js';
import Friends from './pages/friends/Friends.js';
import Signup from './pages/signup/Signup.js';
import EditProfile from './pages/profileEdit/profileEdit.js';
import EditEvent from './pages/editEvent/editEvent.js';
import NewEvent from './pages/newEvent/newEvent.js';
import Footer from './components/Footer/index';

function App() {
  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/friends/*" element={<Friends/>}/>
        <Route path="/timeline/:id?" element={<Timeline/>}/>
        <Route path="/editprofile" element={<EditProfile/>}/>
        <Route path="/editevent/:id" element={<EditEvent/>}/>
        <Route path="/newevent" element={<NewEvent/>}/>
      </Routes>
      <Footer/>
    </HashRouter>
    </>
  );
}



export default App;