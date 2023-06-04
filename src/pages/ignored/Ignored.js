import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Ignored.css';

export default function Ignored()  {
    return (
      <>
        <div className="mainFriendBlock">
        <header className='friendHead'>
                    <div className='horizontal'>
                        <h1 className='LifeLine'>Life Line</h1>
                    </div>
                    <div className='navBar'>
                        <Link to="/profile"><button className='go2Profile'>Profile</button></Link>
                        <button className='go2Friends'>Friends</button>
                        <button className='go2TimeLine'>Time Line</button>
                        <button className='logout'>Logout</button>
                    </div>
                </header>
        <div className='friendblock'> 
            <div className='navBackground'></div>

            <div className='friendNav'>
                <div className='friendTab3'>
                    <Link to="/friends"><button className='tabWords3'>Friends</button></Link>
                </div>
                <div className='userTab3'>
                    <Link to="/users"><button className='tabWordsUsers3'>All Users</button></Link>
                </div>
                <div className='blockTab3'><button className='tabWordsBlocked3'>Ignored Users</button></div>
            </div>
            <div className='friendSearchBox'>
                <input type="text" className='searchBar' placeholder='search friends'></input>
                <button className='searchButton'>+</button>
            </div>
            <div className="allIgnored">
                <figure className='ignoredCard'>
                    <img className="ignoredPhoto" src="http://placekitten.com/300/300" />
                    <figcaption className='ignoredBio'>
                        <div className='ignoredBioName'>
                            <p className='smallerP'>Sneaky Mc'Alleycat</p>
                            <p className='smallerP'>Tacoma, Washington</p>
                        </div>
                        <button className='deleteFriend'>X</button>
                    </figcaption>
                </figure>
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
      </>
    );
  }
  