import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './Friends.css';
import {FriendCard} from '../../components/Friends';
import {sendJSONRequest} from "../../utils/helpers";

export default function Friends() {
    const [users, setUsers] = useState([]);

    const loadData = async () => {
        const res = await sendJSONRequest('GET', '/api/friends/', null, true);
        const data = await res.json();
        setUsers(data.friends);
    }

    useEffect(() => {
        loadData();
    }, [])

    let userEls = <span className='addSomeFriends'>Add some Friends!</span>
    if (users.length > 0) {
        userEls = users.map(x => <FriendCard user={x} context={'friend'} />)
    }

    return (
        <>
            <div className="mainFriendBlock">
                <header className='friendHead'>
                    <div className='horizontal'>
                        <h1 className='LifeLine'>Life Line</h1>
                    </div>
                    <div className='navBar'>
                        <Link to="/profile">
                            <button className='go2Profile'>Profile</button>
                        </Link>
                        <button className='go2Friends'>Friends</button>
                        <Link to="/timeline">
                            <button className='go2TimeLine'>Time Line</button>
                        </Link>
                        <button className='logout'>Logout</button>
                    </div>
                </header>
                <div className='friendblock'>
                    <div className='navBackground'></div>

                    <div className='friendNav'>
                        <div className='friendTab'>
                            <button className='tabWords'>Friends</button>
                        </div>
                        <div className='userTab'>
                            <Link to="/users">
                                <button className='tabWordsUsers2'>All Users</button>
                            </Link>
                        </div>
                        <div className='blockTab'>
                            <Link to="/ignored">
                                <button className='tabWordsBlocked2'>Ignored Users</button>
                            </Link>
                        </div>
                    </div>
                    <div className='friendSearchBox'>
                        <input type="text" className='searchBar' placeholder='search friends'></input>
                        <button className='searchButton'>+</button>
                    </div>
                    <div className="allFriends">
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
  