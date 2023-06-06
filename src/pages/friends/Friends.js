import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Friends.css';
import PersonRemove from '@mui/icons-material/PersonRemove';
import Block from '@mui/icons-material/Block';

export default function Friends()  {
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
                        <Link to="/timeline"><button className='go2TimeLine'>Time Line</button></Link>
                        <button className='logout'>Logout</button>
                    </div>
                </header>
        <div className='friendblock'> 
            <div className='navBackground'></div>

            <div className='friendNav'>
                <div className='friendTab'><button className='tabWords'>Friends</button>
                </div>
                <div className='userTab'>
                    <Link to="/users"><button className='tabWordsUsers2'>All Users</button></Link>
                </div>
                <div className='blockTab'>
                    <Link to="/ignored"><button className='tabWordsBlocked2'>Ignored Users</button></Link>
                </div>
            </div>
            <div className='friendSearchBox'>
                <input type="text" className='searchBar' placeholder='search friends'></input>
                <button className='searchButton'>+</button>
            </div>
            <div className="allFriends">
                <figure className='friendCard2'>
                    <img className="friendPhoto" src="http://placekitten.com/300/300" />
                    <figcaption className='friendBio'>
                        <div className='friendBioName'>
                            <p className='smallerP'>Sneaky Mc'Alleycat</p>
                            <p className='smallerP'>Tacoma, Washington</p>
                        </div>
                        <button className='deleteFriend'><PersonRemove sx={{ fontSize: 40 }}/></button>
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
  