import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Ignored.css';
import {FriendCard} from "../../components/Friends";

export default function Ignored()  {
    const [users] = useState([]);

    let userEls = <span className='addSomeFriends'>This is where you'll see users you've ignored</span>
    if (users.length > 0) {
        userEls = users.map(x => <FriendCard user={x} context={'ignored'} />)
    }

    return (
      <>
        <div className="mainFriendBlock">
        <header className='friendHead2'>
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
            <div className='friendSearchBox2'>
                <input type="text" className='searchBar2' placeholder='search friends'></input>
                <button className='searchButton2'>+</button>
            </div>

            <div className='friendNav'>
                <div className='friendTab3'>
                    <Link to="/friends"><button className='tabWords3'>Friends</button></Link>
                </div>
                <div className='userTab3'>
                    <Link to="/users"><button className='tabWordsUsers3'>All Users</button></Link>
                </div>
                <div className='blockTab3'><button className='tabWordsBlocked3'>Ignored Users</button></div>
            </div>
            <div className="allIgnored">
                {userEls}
            </div>
        </div>
        </div>
      </>
    );
  }
  