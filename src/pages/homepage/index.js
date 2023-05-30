import React, { useState } from 'react';
// import { Link } from "react-router-dom"
import { validateEmail } from '../../utils/helpers';
import { validatePassword } from '../../utils/helpers';
import './style.css'
const lifeLineHome = require('../assets/LifeLine2.png')

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

    const handleFormSubmit = (e) => {
      e.preventDefault();
  
      // check to see if the email is valid
      if (!validateEmail(email) || !validatePassword(password)) {
        setErrorMessage('*Your Password or Email is invalid');
        return;
      }
  
      // clear out the input after a successful submit
      setEmail('');
      setPassword('');
    };

return (
      <>
      <div className="homeBlock">
        <figure>
          <img className="lifeLineIcon"src={lifeLineHome}></img>
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

          <button className="createButton" type="button">Create a New Account</button>
        </form>
        
      </div>
      </>
  );
}