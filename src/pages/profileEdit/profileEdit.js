import React, {useEffect, useState} from 'react';
import {Link, Navigate} from "react-router-dom"
import {sendJSONRequest, validateEmail} from '../../utils/helpers';
import { validatePassword } from '../../utils/helpers';
import './profileEdit.css'

export default function ProfileEdit() {

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
        <div className="mainEditBlock">
            <header className='friendHead'>
            <div className='horizontal'>
                <h1 className='LifeLine'>Life Line</h1>
                </div>
                <div className='navBar'>
                    <Link to="/profile"><button className='go2Profile'>Profile</button></Link>
                    <Link to="/friends"><button className='go2Friends'>Friends</button></Link>
                    <Link to="/timeline"><button className='go2TimeLine'>Time Line</button></Link>
                    <button className='logout'>Logout</button>
                </div>
            </header>
            <div className='editBlock' >
            <div className='navBackground'></div>
                <form className='editForm'>
                    <h2>Profile Edit</h2>
                    <label className="formLabel" for="name">User name:</label>
                    <input 
                        className="inputField" 
                        type='text' 
                        name='name' 
                        placeholder='John Smith'
                        onChange={handleInputChange}>
                    </input>
                    <label className="formLabel" for="email">Email:</label>
                    <input 
                        className="inputField" 
                        type='email' 
                        name='email' 
                        placeholder='email@email.com'
                        onChange={handleInputChange}>
                    </input>
                    <label className="formLabel" for="password">Password Reset:</label>
                    <input 
                        className="inputField" 
                        type='password' 
                        name='password'
                        onChange={handleInputChange}>     
                    </input>
                    <label className="formLabel" for="password">Confirm Password:</label>
                    <input 
                        className="inputField" 
                        type='password' 
                        name='password'
                        onChange={handleInputChange}>
                    </input>
                    <label className="formLabel" for="birthdate">Birth Date:</label>
                    <input 
                        className="inputField" 
                        type='date' 
                        name='birthdate' 
                        onChange={handleInputChange}>
                    </input>
                    <label className="formLabel" for="birthlocation">Birth Location:</label>
                    <input 
                        className="inputField" 
                        type='text' 
                        name='name' 
                        placeholder='Miami, Florida'
                        onChange={handleInputChange}>
                    </input>
                    <label className="formLabel" for="currentlocation">Current Location:</label>
                    <input 
                        className="inputField" 
                        type='text' 
                        name='name' 
                        placeholder='Seattle, Washington'
                        onChange={handleInputChange}>
                    </input>
                    <div className='imgUpload'>
                        <img src="https://dummyimage.com/200x200/000/aaa"></img>
                        <div className='uploadButton'>Upload Button</div>
                    </div>
                    {/* if validate email or password fails display error message */}
                    <div className="errorBlock">
                        {errorMessage && (
                        <p className="error-text">{errorMessage}</p>
                        )}
                    </div>
                    <button className='submitChanges' onClick={handleFormSubmit}>Save Changes</button>
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
