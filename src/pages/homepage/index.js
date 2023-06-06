import React, { useState } from 'react';
import {Link, Navigate} from "react-router-dom"
import {sendJSONRequest, validateEmail} from '../../utils/helpers';
import './style.css'
const lifeLineHome = require('../assets/LifeLine2.png')

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [doRedirect, setDoRedirect] = useState(false);

  const handleInputChange = (e) => {
      // Getting the value and name of the input which triggered the change
      const { target } = e;
      const inputType = target.name;
      const inputValue = target.value;
  
      // Based on the input type, we set the state of either email or password
      if (inputType === 'email') {
        setEmail(inputValue);
      } else {
        setPassword(inputValue);
      }
    };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      // check to see if the email is valid
      if (!validateEmail(email)) {
        setErrorMessage('*Your Password or Email is invalid');
        return;
      }

      console.log(email, password);

      const res = await sendJSONRequest('POST', '/api/account/token', {
        email: email,
        password: password,
      });
      const data = await res.json();

      if (res.status !== 200) {
        setErrorMessage(data.message);
        return;
      }

      setErrorMessage('');
      await localStorage.setItem('token', data.token);
      setDoRedirect(true);

    };

    if (doRedirect) {
      return (
          <Navigate to={"/profile"} />
      )
    }

return (
      <>
      <div className="homeBlock">
        <div className='mainblock'> 
        <figure>
          <img className="lifeLineIcon"src={lifeLineHome} alt='icon for the brand life line'></img>
        </figure>
        <form className="loginForm">
          <h1 className="webName">Life Line</h1>

          <input 
          value={email}
          className="emailLogin" 
          type="email" 
          placeholder='Email Address' 
          name="email"
          onChange={handleInputChange}/>

          <input 
          value={password}
          className="passwordLogin" 
          type="password" 
          placeholder='Password' 
          name="Password"
          onChange={handleInputChange}/>

          {/* if validate email or password fails display error message */}
          <div className="errorBlock">
            {errorMessage && (
              <p className="error-text">{errorMessage}</p>
            )}
          </div>

          <button className="loginButton" type="button" onClick={handleFormSubmit}>Log in</button>

          <hr className="loginDivider"></hr>
          <p className="dividerOr">OR</p>

          <Link to="/signup"><button className="createButton" type="button">Create a New Account</button></Link>

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