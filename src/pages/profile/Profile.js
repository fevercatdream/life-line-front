import React, { useState } from 'react';
import { Link } from "react-router-dom"
import './Profile.css'

export default function Profile() {

    return (
        <>
        <div className="mainProfileBlock">

            <div className='profileblock'> 
                <div className='navBackground'></div>
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
                        <div className='profilePic'>
                            <div className='colorBlock1'>
                                <div className='editIcon'>EDIT</div>
                            </div>
                            <img className="profileImg" src="http://placekitten.com/300/300" />
                            <p className='contactName'>Snowball McKitten</p>
                        </div>
                        <div className='bioColumn'>
                            <div className='colorBlock4'> 
                                <div className='editIcon2'>EDIT</div>
                            </div>
                            <div className='bioWhite'>
                                <p className='contactHead'>Birth Date:</p>
                                <p className='contactDate'>May 1<sup>st</sup>, 2023</p>
                                <p className='contactHead'>Birth Place:</p>
                                <p className='contactLoc'>Seattle, Washington</p>
                                <p className='contactHead'>Current Location:</p>
                                <p className='contactNow'>Burlington, Washington Burlington, Washington</p>
                            </div>
                            <p className='contactBio'>Profile Info</p>
                        </div>
                        <div className='suggestBox'>
                            <img className='suggestFriend1' src='http://placekitten.com/150/150'>
                                
                            </img>
                            <img className='suggestFriend2' src='http://placekitten.com/150/150'></img>
                            <img className='suggestFriend3' src='http://placekitten.com/150/150'></img>
                            <img className='suggestFriend4' src='http://placekitten.com/150/150'></img>
                        </div>
                        <div className='colorBlock5'>
                            <p className='mayKnow'>Users you may know</p>
                        </div>
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
                        {/* <div className='colorBlock'></div> */}
                        <div className='colorBlock2'></div>
                        <div className='recentText'><p class="textBar">Recent Events</p></div>
                        <div className='recentManyDiv'>
                            <figure className='recentMany1'>
                                <img className='recentMediaSmall' src="https://dummyimage.com/300x200/000/aaa" />
                                <div className='recentComReac'>
                                    <p className='comments2'><b>Comments: </b><span>5</span></p>
                                    <p className='likes2'><b>Likes: </b>15</p>
                                </div>
                            </figure>
                            <figure className='recentMany2'>
                                <img className='recentMediaSmall' src="https://dummyimage.com/300x200/000/aaa" />
                                <div className='recentComReac'>
                                    <p className='comments2'><b>Comments: </b><span>5</span></p>
                                    <p className='likes2'><b>Likes: </b>15</p>
                                </div>
                            </figure>
                            <figure className='recentMany3'>
                                <img className='recentMediaSmall' src="https://dummyimage.com/300x200/000/aaa" />
                                <div className='recentComReac'>
                                    <p className='comments2'><b>Comments: </b><span>5</span></p>
                                    <p className='likes2'><b>Likes: </b>15</p>
                                </div>
                            </figure>
                            <figure className='recentMany4'>
                                <img className='recentMediaSmall' src="https://dummyimage.com/300x200/000/aaa" />
                                <div className='recentComReac'>
                                    <p className='comments2'><b>Comments: </b><span>5</span></p>
                                    <p className='likes2'><b>Likes: </b>15</p>
                                </div>
                            </figure>
                        </div>
                    </div>
                    <div className='friendBox'>
                        <div className='colorBlock3'></div>
                        <div className='friendRow'>
                            <figure className='friendCard'>
                                <img className='friendSmall' src='http://placekitten.com/150/150'></img>
                                <p className='friendName'>Name is too long for this box</p>
                                <p className='friendLocation'>Location is too long for this box</p>
                            </figure>
                            <figure className='friendCard'>
                                <img className='friendSmall' src='http://placekitten.com/150/150'></img>
                                <p className='friendName'>Name is too long for this box</p>
                                <p className='friendLocation'>Location is too long for this box</p>
                            </figure>
                            <figure className='friendCard'>
                                <img className='friendSmall' src='http://placekitten.com/150/150'></img>
                                <p className='friendName'>Name is too long for this box</p>
                                <p className='friendLocation'>Location is too long for this box</p>
                            </figure>
                            <figure className='friendCard'>
                                <img className='friendSmall' src='http://placekitten.com/150/150'></img>
                                <p className='friendName'>Name is too long for this box</p>
                                <p className='friendLocation'>Location is too long for this box</p>
                            </figure>
                            <figure className='friendCard'>
                                <img className='friendSmall' src='http://placekitten.com/150/150'></img>
                                <p className='friendName'>Name is too long for this box</p>
                                <p className='friendLocation'>Location is too long for this box</p>
                            </figure>
                            <figure className='friendCard'>
                                <img className='friendSmall' src='http://placekitten.com/150/150'></img>
                                <p className='friendName'>Name is too long for this box</p>
                                <p className='friendLocation'>Location is too long for this box</p>
                            </figure>
                        </div>
                        <div className='friendHeaderRow'>
                            <p className='friendHeader'>Friend List</p>
                            <p className='viewMore'>View <span>103</span> more</p>
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