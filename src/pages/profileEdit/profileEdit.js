import React, {useEffect, useState} from 'react';
import {Link, Navigate} from "react-router-dom"
import {backendHost, sendJSONRequest} from '../../utils/helpers';
import './profileEdit.css'
import NavTabs from "../../components/Navbar";

export default function ProfileEdit() {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthLocation, setBirthLocation] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const token = localStorage.getItem('token');
    const [errorMessage, setErrorMessage] = useState('');
    const [profileUrl, setProfileUrl] = useState();
    const [sendToHomepage, setSendToHomepage] = useState(false);


    const loadProfile = async () => {
        const p = await sendJSONRequest('GET', '/api/profile', null, true);
        const data = await p.json();
        setName(data.name);
        setBirthDate(data.birthdate);
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
        setSendToHomepage(true);
    };

    if (sendToHomepage) {
        return (
            <Navigate to={'/profile'} />
        )
    }

    return (
        <>
            <div className="mainEditBlock">
                <div className='navBackground'></div>
                <NavTabs/>
                <div className='editBlock'>
                    <div className='navBackground'></div>
                    <form className='editForm'>
                        <h2>Profile Edit</h2>
                        <label className="formLabel" htmlFor="name">Your name:</label>
                        <input
                            className="inputField"
                            type='text'
                            name='name'
                            placeholder='name'
                            value={name}
                            onChange={e => setName(e.target.value)}>
                        </input>
                        <label className="formLabel" htmlFor="birthdate">Birth Date:</label>
                        <input
                            className="inputField"
                            type='date'
                            name='birthdate'
                            value={birthDate}
                            onChange={e => setBirthDate(e.target.value)}>
                        </input>
                        <label className="formLabel" htmlFor="birthlocation">Birth Location:</label>
                        <input
                            className="inputField"
                            type='text'
                            name='name'
                            placeholder='Miami, Florida'
                            value={birthLocation}
                            onChange={e => setBirthLocation(e.target.value)}>
                        </input>
                        <label className="formLabel" htmlFor="currentlocation">Current Location:</label>
                        <input
                            className="inputField"
                            type='text'
                            name='name'
                            placeholder='Seattle, Washington'
                            value={currentLocation}
                            onChange={e => setCurrentLocation(e.target.value)}>
                        </input>
                        <ProfilePic token={token} url={profileUrl} setUrl={setProfileUrl}/>
                        {/* if validate email or password fails display error message */}
                        <div className="errorBlock2">
                            {errorMessage && (
                                <p className="error-text">{errorMessage}</p>
                            )}
                        </div>
                        <button className='submitChanges' onClick={handleFormSubmit}>Save Changes</button>
                    </form>
                </div>
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
            <div className='uploadedPhotoBox'><img src={url} alt={'upload'} class="uploadedPhoto"></img></div>
            <input type={"file"} accept={'image/*'} onChange={uploadFile} className='uploadButton'/>
        </div>
    )
}