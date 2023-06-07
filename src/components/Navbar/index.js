import React, {useState} from "react";
import {Navigate, NavLink} from "react-router-dom"


function NavTabs() {
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
        <nav className="navbar navbar-expand-sm navSection">
            <div className="container-fluid">
                <div className={"mx-3"}>
                    <div className={"navbar-brand fs-3"}>Life Line</div>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id={'navbarCollapse'}>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/profile" className={"nav-link"}>Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/friends" className={"nav-link"}>Friends</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/timeline/:id?"} className={"nav-link"}>Time Line</NavLink>

                        </li>
                        <li className="nav-item">
                            <button onClick={logout} className={"nav-link"}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    );
}

export default NavTabs;