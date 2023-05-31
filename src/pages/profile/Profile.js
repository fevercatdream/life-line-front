import React, { useState } from 'react';
import { Link } from "react-router-dom"
import './Profile.css'

export default function Profile() {

    return (
        <>
        <div className="mainProfileBlock">

            <div className='profileblock'> 
                <header className='profileHeader'>
                    <div className='horizontal'>
                        <button className='profileOptions'>+</button>
                        <h1 className='LifeLine'>Life Line</h1>
                    </div>
                    <div>
                        <input type="text" className='searchBar' placeholder='search'></input>
                        <button className='searchButton'>+</button>
                    </div>
                </header>
                <div className='profilePicBox'>
                    <div className='profileBox'>
                        <img className='profilePic' src="http://placekitten.com/300/300" />
                        <hr className="sidebarHr"/>
                        <div className='flexColumn'>
                            <p className='contactHead'>Name:</p>
                            <p className='contactName'>Snowball McKitten</p>
                            <p className='contactHead'>Birth Date:</p>
                            <p className='contactDate'>May 1<sup>st</sup>, 2023</p>
                            <p className='contactHead'>Birth Place:</p>
                            <p className='contactLoc'>Seattle, Washington</p>
                        </div>
                        <hr className="sidebarHr"/>
                        <p className='mayKnow'>Users you may know:</p>
                        <div className='suggestBox'>
                            <img className='suggestFriend1' src='http://placekitten.com/150/150'></img>
                            <img className='suggestFriend2' src='http://placekitten.com/150/150'></img>
                            <img className='suggestFriend3' src='http://placekitten.com/150/150'></img>
                            <img className='suggestFriend4' src='http://placekitten.com/150/150'></img>
                        </div>
                        <button className='blockedUsers'>Blocked Users</button>
                    </div>
                <div className='bioBox'>
                    <div className='notifBox'>
                        <p>Notifications</p>
                    </div>
                    <div className='recentBox'>
                        <p>Recent Events</p>
                        <button className='go2TimeLine'>Time Line</button>
                    </div>
                    <div className='friendBox'>
                        <p>friends</p>
                    </div>
                </div>
            </div>


        <footer className="footer">
            <nav className="footerNav">
            <p className="footLinks">Sign Up</p>
            <p className="footLinks">Log In</p>
            <p className="footLinks">About</p>
            <p className="footLinks">Developers</p>
            </nav>
            <p className="copyright">Meta © 2023 Life Line</p>
        </footer>
        </div>
        </div>
        </>
        );
      }