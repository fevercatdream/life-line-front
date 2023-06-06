import React, {useEffect, useState} from 'react';
import {Link, Navigate} from "react-router-dom"
import {backendHost, sendJSONRequest, validateEmail} from '../../utils/helpers';
import {validatePassword} from '../../utils/helpers';
import './profileEdit.css'

export default function ProfileEdit() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthLocation, setBirthLocation] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const token = localStorage.getItem('token');
    const [errorMessage, setErrorMessage] = useState('');
    const [profile, setProfile] = useState({});
    const [profileUrl, setProfileUrl] = useState();

    const loadProfile = async () => {
        const p = await sendJSONRequest('GET', '/api/profile', null, true);
        const data = await p.json();
        setProfile(data);
        setName(data.name);
        setBirthLocation(data.birthplace);
        setCurrentLocation(data.current_location);
        setProfileUrl(data.profile_url);
    }

    useEffect(() => {
        loadProfile()
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // check to see if the email is valid
        // if (!validateEmail(email)) {
        //     setErrorMessage('*Your Email is invalid');
        //     return;
        // }

        if (!name) {
            setErrorMessage('*Your Name cannot be empty');
            return;
        }

        const res = await sendJSONRequest('PUT', '/api/profile/update', {
            // email: email,
            name: name,
            birthDate: birthDate,
            birthPlace: birthLocation,
            location: currentLocation,
        }, true);
        const data = await res.json();

        if (res.status !== 200) {
            setErrorMessage(data.message);
            return;
        }

        setErrorMessage('');
    };

    return (
        <>
            <div className="mainEditBlock">
                <header className='friendHead'>
                    <div className='horizontal'>
                        <h1 className='LifeLine'>Life Line</h1>
                    </div>
                    <div className='navBar'>
                        <Link to="/profile">
                            <button className='go2Profile'>Profile</button>
                        </Link>
                        <Link to="/friends">
                            <button className='go2Friends'>Friends</button>
                        </Link>
                        <Link to="/timeline">
                            <button className='go2TimeLine'>Time Line</button>
                        </Link>
                        <button className='logout'>Logout</button>
                    </div>
                </header>
                <div className='editBlock'>
                    <div className='navBackground'></div>
                    <form className='editForm'>
                        <h2>Profile Edit</h2>
                        <label className="formLabel" for="name">Your name:</label>
                        <input
                            className="inputField"
                            type='text'
                            name='name'
                            placeholder='name'
                            value={profile.name}
                            onChange={e => setName(e.target.value)}>
                        </input>
                        {/*<label className="formLabel" for="email">Email:</label>*/}
                        {/*<input*/}
                        {/*    className="inputField"*/}
                        {/*    type='email'*/}
                        {/*    name='email'*/}
                        {/*    placeholder='email@email.com'*/}
                        {/*    value={profile.email}*/}
                        {/*    onChange={e => setEmail(e.target.value)}>*/}
                        {/*</input>*/}
                        <label className="formLabel" for="birthdate">Birth Date:</label>
                        <input
                            className="inputField"
                            type='date'
                            name='birthdate'
                            onChange={e => setBirthDate(e.target.value)}>
                        </input>
                        <label className="formLabel" for="birthlocation">Birth Location:</label>
                        <input
                            className="inputField"
                            type='text'
                            name='name'
                            placeholder='Miami, Florida'
                            onChange={e => setBirthLocation(e.target.value)}>
                        </input>
                        <label className="formLabel" for="currentlocation">Current Location:</label>
                        <input
                            className="inputField"
                            type='text'
                            name='name'
                            placeholder='Seattle, Washington'
                            onChange={e => setCurrentLocation(e.target.value)}>
                        </input>
                        <ProfilePic token={token} url={profileUrl} setUrl={setProfileUrl}/>
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


function ProfilePic({token, url, setUrl}) {
    const uploadFile = async (e) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('photo', file);
        const res = await fetch(`${backendHost}/api/profile/photo`, {
            method: 'POST',
            headers: {
                'Authorization': token,
            },
            body: formData,
        })
        if (res.status !== 200) {
            console.log("failed to upload new user photo");
            return;
        }
        const data = await res.json();
        setUrl(data.url);
    }

    // const picker = <input type={"file"} accept={'image/*'} onChange={uploadFile}/>
    // {picker}

    return (
        <div className='imgUpload'>
            <img src={url} width={300} height={300}></img>
            <input type={"file"} accept={'image/*'} onChange={uploadFile} />
        </div>
    )
}