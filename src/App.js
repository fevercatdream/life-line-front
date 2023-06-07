import React from "react";
import {Routes, Route, HashRouter} from "react-router-dom";
import Homepage from './pages/homepage/index.js';
import Timeline from './pages/timeline/Timeline.js';
import Profile from './pages/profile/Profile.js';
import Friends from './pages/friends/Friends.js';
import Signup from './pages/signup/Signup.js';
import Users from './pages/users/Users.js';
import Ignored from './pages/ignored/Ignored.js';
import EditProfile from './pages/profileEdit/profileEdit.js';
import EditEvent from './pages/editEvent/editEvent.js';
import NewEvent from './pages/newEvent/newEvent.js';

function App() {
  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/friends" element={<Friends/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/ignored" element={<Ignored/>}/>
        <Route path="/timeline/:id?" element={<Timeline/>}/>
        <Route path="/editprofile" element={<EditProfile/>}/>
        <Route path="/editevent" element={<EditEvent/>}/>
        <Route path="/newevent" element={<NewEvent/>}/>
      </Routes>
    </HashRouter>
    </>
  );
}

export default App;