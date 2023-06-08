import React, { useState } from 'react';
import {Link, NavLink, Route, Routes} from "react-router-dom";
import './Friends.css';
import NavTabs from "../../components/Navbar";
import {MyFriends, AllUsers, IgnoredUsers} from "../../components/Friends";

import Search from '@mui/icons-material/Search';


export default function Friends() {
    const [activePage, setActivePage] = useState(1)

    const friendsClass = () => {
        // based on active page return the right string
        if (activePage === 1) {
            return "allFriends greyBack";
        } else if ( activePage === 2) {
            return "allFriends blueBack";
        } else {
            return "allFriends redBack"
        }
    }

    return (
        <>
            <div className="mainFriendBlock">
            <div className='navBackground'></div>
                    <NavTabs />
                    <div className='friendSearchBox2'>
                        <input type="text" className='searchBar2' placeholder='search friends'></input>
                        <button className='searchButton'><Search sx={{ fontSize: 20 }} /></button>
                    </div>
                <div className='friendblock'>
                    
                    <div className='friendNav'>
                        <div className={activePage === 1 ? "friendTab activeTab" : "friendTab"}
                        onClick= { () => {
                            setActivePage(1);
                        }}
                        >
                            <NavLink to="/friends">
                                <button className='tabWords'>Friends</button>
                            </NavLink>
                        </div>
                        <div className={activePage === 2 ? "userTab activeTab" : "userTab"}
                        onClick= { () => {
                            setActivePage(2);
                        }}
                        >
                            <NavLink to="/friends/users">
                                <button className='tabWordsUsers2'>All Users</button>
                            </NavLink>
                        </div>
                        <div className={activePage === 3 ? "blockTab activeTab" : "blockTab"}
                        onClick= { () => {
                            setActivePage(3);
                        }}
                        >
                            <NavLink to="/friends/ignored">
                                <button className='tabWordsBlocked2'>Ignored Users</button>
                            </NavLink>
                        </div>
                    </div>
                    <div className={friendsClass()}>
                        <Routes>
                            <Route path={'/'} element={<MyFriends />}/>
                            <Route path={'/users'} element={<AllUsers />}/>
                            <Route path={'/ignored'} element={<IgnoredUsers />}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}
  