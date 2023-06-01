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
                        <h1 className='LifeLine'>Life Line</h1>
                    </div>
                    <div className='navBar'>
                        <button className='go2Profile'>Profile</button>
                        <button className='go2Friends'>Friends</button>
                        <button className='go2TimeLine'>Time Line</button>
                        <button className='logout'>Logout</button>
                    </div>
                </header>
                <div className='profilePicBox'>
                    <div className='profileBox'>
                        <img className='profilePic' src="http://placekitten.com/300/300" />
                        <hr className="sidebarHr"/>
                        <div className='bioColumn'>
                            <p className='contactHead'>Name:</p>
                            <p className='contactName'>Snowball McKitten</p>
                            <p className='contactHead'>Birth Date:</p>
                            <p className='contactDate'>May 1<sup>st</sup>, 2023</p>
                            <p className='contactHead'>Birth Place:</p>
                            <p className='contactLoc'>Seattle, Washington</p>
                            <p className='contactHead'>Current Location:</p>
                            <p className='contactNow'>Burlington, Washington</p>
                        </div>
                        <hr className="sidebarHr"/>
                        <p className='mayKnow'>Users you may know:</p>
                        <div className='suggestBox'>
                            <img className='suggestFriend1' src='http://placekitten.com/150/150'></img>
                            <img className='suggestFriend2' src='http://placekitten.com/150/150'></img>
                            <img className='suggestFriend3' src='http://placekitten.com/150/150'></img>
                            <img className='suggestFriend4' src='http://placekitten.com/150/150'></img>
                        </div>
                        {/* <button className='blockedUsers'>Blocked Users</button> */}
                    </div>
                <div className='bioBox'>
                    <div className='notifSearchBox'>
                        <div className='notifEvent'>
                            <p className='notifys'><b>New Comments:</b> 12</p>
                            <p className='notifys'><b>New Likes:</b> 36</p>
                            <p className='notifys'><b>New Friend Requests:</b> 7</p>
                        </div>
                        <div>
                            <input type="text" className='searchBar' placeholder='search friends'></input>
                            <button className='searchButton'>+</button>
                        </div>
                    </div>
                    <div className='recentBox'>
                        <figure className='recentCard'>
                            <img className='recentMedia' src="https://dummyimage.com/500x325/000/aaa" />
                            <figcaption className='recentCaption'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</figcaption>
                            <div className='recentComReac'>
                                <p className='comments'><b>Comments: </b><span>5</span></p>
                                <p className='likes'><b>Likes: </b>15</p>
                            </div>
                        </figure>
                        <div className='recentManyDiv'>
                            <figure className='recentMany1'><img className='recentMediaSmall' src="https://dummyimage.com/300x200/000/aaa" /></figure>
                            <figure className='recentMany1'><img className='recentMediaSmall' src="https://dummyimage.com/300x200/000/aaa" /></figure>
                            <figure className='recentMany2'><img className='recentMediaSmall' src="https://dummyimage.com/300x200/000/aaa" /></figure>
                            <figure className='recentMany2'><img className='recentMediaSmall' src="https://dummyimage.com/300x200/000/aaa" /></figure>
                        </div>
                    </div>
                    <div className='friendBox'>
                        <div className='friendHeaderRow'>
                            <h3 className='friendHeader'>Friend List</h3>
                            <p className='viewMore'>View <span>103</span> more</p>
                        </div>
                        <div className='friendRow'>
                            <figure className='friendCard'><img className='friendSmall' src='http://placekitten.com/150/150'></img></figure>
                            <figure className='friendCard'><img className='friendSmall' src='http://placekitten.com/150/150'></img></figure>
                            <figure className='friendCard'><img className='friendSmall' src='http://placekitten.com/150/150'></img></figure>
                            <figure className='friendCard'><img className='friendSmall' src='http://placekitten.com/150/150'></img></figure>
                            <figure className='friendCard'><img className='friendSmall' src='http://placekitten.com/150/150'></img></figure>
                            <figure className='friendCard'><img className='friendSmall' src='http://placekitten.com/150/150'></img></figure>
                        </div>
                    </div>
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
        </>
        );
      }