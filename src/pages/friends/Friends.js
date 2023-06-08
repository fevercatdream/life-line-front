import React from 'react';
import {Link, NavLink, Route, Routes} from "react-router-dom";
import './Friends.css';
import NavTabs from "../../components/Navbar";
import {MyFriends, AllUsers, IgnoredUsers} from "../../components/Friends";


export default function Friends() {
    return (
        <>
            <div className="mainFriendBlock">
            <div className='navBackground'></div>
                    <NavTabs />
                    <div className='friendSearchBox2'>
                        <input type="text" className='searchBar2' placeholder='search friends'></input>
                        <button className='searchButton2'>+</button>
                    </div>
                <div className='friendblock'>
                    
                    <div className='friendNav'>
                        <div className='friendTab'>
                            <NavLink to="/friends">
                                <button className='tabWords'>Friends</button>
                            </NavLink>
                        </div>
                        <div className='userTab'>
                            <NavLink to="/friends/users">
                                <button className='tabWordsUsers2'>All Users</button>
                            </NavLink>
                        </div>
                        <div className='blockTab'>
                            <NavLink to="/friends/ignored">
                                <button className='tabWordsBlocked2'>Ignored Users</button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="allFriends">
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
  