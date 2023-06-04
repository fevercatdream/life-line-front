import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom"
import {backendHost, sendJSONRequest, validateEmail} from '../../utils/helpers';
import {validatePassword} from '../../utils/helpers';

const lifeLineHome = require('../assets/LifeLine2.png')

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [doRedirect, setDoRedirect] = useState(false);
    const [inflight, setInflight] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // check to see if the email is valid
        if (!validateEmail(email)) {
            setErrorMessage('*Please use a valid Email');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('*Password must be 8 or more characters');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('*Passwords do not match');
            return;
        }

        console.log(email, password);

        setInflight(true);
        const res = await sendJSONRequest('PUT', '/api/account/create', {
            email: email,
            password: password,
        })
        const data = await res.json();
        setInflight(false);
        if (res.status !== 200) {
            setErrorMessage(data.message);
            return;
        }

        localStorage.setItem('token', data.token);
        setDoRedirect(true);
    };

    if (doRedirect) {
        return (
            <Navigate to={'/profile'} />
        )
    }

    return (
        <>
            <div className="homeBlock">
                <div className='mainblock'>
                    <figure>
                        <img className="lifeLineIcon" src={lifeLineHome} alt='icon for the brand life line'></img>
                    </figure>
                    <form className="loginForm">
                        <h1 className="webName">Life Line</h1>

                        <input
                            value={email}
                            className="emailLogin"
                            type="email"
                            placeholder='Email Address'
                            name="email"
                            onChange={e => setEmail(e.target.value)}/>

                        <input
                            value={password}
                            className="passwordLogin"
                            type="password"
                            placeholder='Password'
                            name="Password"
                            onChange={e => setPassword(e.target.value)}/>

                        <input
                            value={confirmPassword}
                            className="passwordLogin"
                            type="password"
                            placeholder='Re-enter Password'
                            name="Password"
                            onChange={e => setConfirmPassword(e.target.value)}/>

                        {/* if validate email or password fails display error message */}
                        <div className="errorBlock">
                            {errorMessage && (
                                <p className="error-text">{errorMessage}</p>
                            )}
                        </div>

                        <button className="createButton" type="button" onClick={handleFormSubmit} disabled={inflight}>Create a New Account
                        </button>

                        <hr className="loginDivider"></hr>
                        <p className="dividerOr">OR</p>

                        <Link to="/">
                            <button className="loginButton" type="button">Log in</button>
                        </Link>

                    </form>

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