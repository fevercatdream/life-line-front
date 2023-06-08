import React, {useState} from "react";
import {Navigate, NavLink} from "react-router-dom"
import './style.css';
import DensityMedium from '@mui/icons-material/DensityMedium';


function NavTabs() {
    const [navVisible, setNavVisible] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    }
    if (!token) {
        return (
            <Navigate to={'/'}/>
        )
    }
    return (
        <nav className='friendHead2'>
            <div className='horizontal'>
                <h1 className='LifeLine'>Life Line</h1>
                <button className='hamburger' onClick={() => navVisible ? setNavVisible(false) : setNavVisible(true)}><DensityMedium /></button>
            </div>
            <div className={navVisible ? "navBar2" : "navBar2 hidden"}>
                <NavLink to={"/profile"}>
                    <button className='go2Profile2'>Profile</button>
                </NavLink>
                <NavLink to={"/friends"}>
                    <button className='go2Friends2'>Friends</button>
                </NavLink>
                <NavLink to={`/timeline`}>
                    <button className='go2TimeLine2'>Time Line</button>
                </NavLink>
                <button className='logout2' onClick={logout}>Logout</button>
            </div>
            <div className='navBar'>
                <NavLink to={"/profile"}>
                    <button className='go2Profile'>Profile</button>
                </NavLink>
                <NavLink to={"/friends"}>
                    <button className='go2Friends'>Friends</button>
                </NavLink>
                <NavLink to={`/timeline`}>
                    <button className='go2TimeLine'>Time Line</button>
                </NavLink>
                <button className='logout' onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default NavTabs;