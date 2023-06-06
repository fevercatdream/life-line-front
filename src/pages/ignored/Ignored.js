import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Ignored.css';
import {FriendCard} from "../../components/Friends";

export default function Ignored()  {
    const [users] = useState([]);

    let userEls = <span>Nothing to see here!</span>
    if (users.length > 0) {
        userEls = users.map(x => <FriendCard user={x} context={'ignored'} />)
    }

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
                {userEls}
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
  