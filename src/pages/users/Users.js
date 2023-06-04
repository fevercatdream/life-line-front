import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Users.css';

export default function Users()  {
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
                <div className='friendTab2'>
                    <Link to="/friends"><button className='tabWords'>Friends</button></Link>
                </div>
                <div className='userTab2'><p className='tabWordsUsers'>All Users</p></div>
                <div className='blockTab2'><button className='tabWordsBlocked'>Blocked Users</button></div>
            </div>
            <div className='friendSearchBox'>
                <input type="text" className='searchBar' placeholder='search friends'></input>
                <button className='searchButton'>+</button>
            </div>
            <div className="allUsers">
                <figure className='userCard'>
                    <img className="userPhoto" src="http://placekitten.com/300/300" />
                    <figcaption className='userBio'>
                        <div className='userBioName'>
                            <p className='smallerP'>Sneaky Mc'Alleycat</p>
                            <p className='smallerP'>Tacoma, Washington</p>
                        </div>
                        <button className='blockUser'>X</button>
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
  