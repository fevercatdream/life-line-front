import React, {useEffect, useState} from 'react';
import {Link, Navigate} from "react-router-dom"
import './Profile.css'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import {backendHost, sendJSONRequest} from "../../utils/helpers";
import Chat from '@mui/icons-material/Chat';
import Favorite from '@mui/icons-material/Favorite';
import PersonAddAlt1 from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function Profile() {
    const [modalVisible, setModalVisible] = useState(false);
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const loadData = async () => {
        if (!token) {
            return;
        }

        const res = await sendJSONRequest('GET', '/api/profile', null, true);
        if (res.status !== 200) {
            // handle errors
            console.log("somethign went wrong we ");
            return;
        }

        const p = await res.json();
        setProfile(p);
        setLoading(false);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    useEffect(() => {
        loadData();
    }, [token])

    if (!token) {
        return (
            <Navigate to={'/'}/>
        )
    }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    const userYouKnowImages = profile.known_users.map(k => <img className='suggestFriend1' src={k.profile_url}
                                                                key={k.id} alt={'placeholder'}/>)

    // Array for gallery slider images
    const images = [9, 8, 7, 6, 5].map((number) => (
        {
            src: `https://placedog.net/${number}00/${number}00?id=${number}`,
            // srcset: `https://placedog.net/400/240?id=1 400w, https://placedog.net/700/420?id=1 700w, https://placedog.net/1000/600?id=1 1000w`,
            // sizes: '(max-width: 1000px) 400px, (max-width: 2000px) 700px, 1000px',
            alt: `Dogs are domesticated mammals, not natural wild animals. They were originally bred from wolves. They have been bred by humans for a long time, and were the first animals ever to be domesticated.`,
            // thumbnail: `https://placedog.net/100/60?id=1`
        }
    ));

    return (
        <>
            <div className="mainProfileBlock">
                <div className='profileblock'>
                    <div id='blackOut' className={modalVisible ? "blackOut" : "blackOut hidden"}
                         onClick={() => setModalVisible(false)}></div>
                    <div className='navBackground'></div>
                    <header className='profileHeader'>
                        <div className='horizontal'>
                            <h1 className='LifeLine'>Life Line</h1>
                        </div>
                        <div className='navBar'>
                            <button className='go2Profile'>Profile</button>
                            <Link to="/friends">
                                <button className='go2Friends'>Friends</button>
                            </Link>
                            <Link to="/timeline">
                                <button className='go2TimeLine'>Time Line</button>
                            </Link>
                            <button className='logout' onClick={logout}>Logout</button>
                        </div>
                    </header>
                    <div className='profilePicBox'>
                        <div className='profileBox'>
                            <ProfilePic profile={profile} loadData={loadData} token={token}/>
                            <ProfileInfo profile={profile}/>
                            <div className='suggestBox'>
                                {userYouKnowImages}
                            </div>
                            <div className='colorBlock5'>
                                <p className='mayKnow'>Users you may know</p>
                            </div>
                        </div>
                        <div className='bioBox'>
                            <div className='notifSearchBox'>
                                <div className='notifEvent'>
                                    <div className='notifRow'>
                                        <p className='notifys'>{profile.new_comments}</p>
                                        <Chat sx={{ fontSize: 25 }} className='commentBtn'/>
                                    </div>
                                    <div className='notifRow'>
                                        <p className='notifys'>{profile.new_likes}</p>
                                        <Favorite sx={{ fontSize: 25 }} className='likeBtn'/>
                                    </div>
                                    <div className='notifRow'>
                                        <p className='notifys'>{profile.new_friend_requests}</p>
                                        <PersonAddAlt1 sx={{ fontSize: 30 }} className='addBtn'/>
                                    </div>
                                </div>
                                <div>
                                    <input type="text" className='searchBar' placeholder='search friends'></input>
                                    <button className='searchButton'>+</button>
                                </div>
                            </div>
                            <div className='recentBox'>
                                <figure id="recentCard" className='recentCard' onClick={() => setModalVisible(true)}>

                                    <img className='recentMedia' src="https://dummyimage.com/500x325/000/aaa"
                                         alt='placeholder'/>
                                    <figcaption className='recentCaption'>Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                        ut aliquip ex ea commodo consequat.
                                    </figcaption>
                                    <div className='recentComReac'>
                                        <p className='comments'>5</p>
                                        <Chat sx={{ fontSize: 25 }} className='commentBtn'/>
                                        <p className='likes'>15</p>
                                        <Favorite sx={{ fontSize: 25 }} className='likeBtn'/>
                                    </div>
                                </figure>
                                <div className='colorBlock2'></div>
                                <div className='recentText'><p class="textBar">Recent Events</p></div>
                                <div className='recentManyDiv'>
                                    <figure className='recentMany1'>
                                        <img className='recentMediaSmall' src="https://dummyimage.com/300x200/000/aaa"
                                             alt='placeholder'/>
                                        <div className='recentComReac'>
                                            <p className='comments2'>5</p>
                                            <Chat sx={{ fontSize: 20 }} className='commentBtn'/>
                                            <p className='likes2'>15</p>
                                            <Favorite sx={{ fontSize: 20 }} className='likeBtn'/>
                                        </div>
                                    </figure>
                                    <figure className='recentMany2'>
                                        <img className='recentMediaSmall' src="https://dummyimage.com/300x200/000/aaa"
                                             alt='placeholder'/>
                                        <div className='recentComReac'>
                                            <p className='comments2'>5</p>
                                            <Chat sx={{ fontSize: 20 }} className='commentBtn'/>
                                            <p className='likes2'>15</p>
                                            <Favorite sx={{ fontSize: 20 }} className='likeBtn'/>
                                        </div>
                                    </figure>
                                    <figure className='recentMany3'>
                                        <img className='recentMediaSmall' src="https://dummyimage.com/300x200/000/aaa"
                                             alt='placeholder'/>
                                        <div className='recentComReac'>
                                            <p className='comments2'>5</p>
                                            <Chat sx={{ fontSize: 20 }} className='commentBtn'/>
                                            <p className='likes2'>15</p>
                                            <Favorite sx={{ fontSize: 20 }} className='likeBtn'/>
                                        </div>
                                    </figure>
                                    <figure className='recentMany4'>
                                        <img className='recentMediaSmall' src="https://dummyimage.com/300x200/000/aaa"
                                             alt='placeholder'/>
                                        <div className='recentComReac'>
                                            <p className='comments2'>5</p>
                                            <Chat sx={{ fontSize: 20 }} className='commentBtn'/>
                                            <p className='likes2'>15</p>
                                            <Favorite sx={{ fontSize: 20 }} className='likeBtn'/>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                            <div className='friendBox'>
                                <div className='colorBlock3'></div>
                                <div className='friendRow'>
                                    <figure className='friendCard'>
                                        <img className='friendSmall' src='http://placekitten.com/150/150'
                                             alt='placeholder'/>
                                        <p className='friendName'>Name is too long for this box</p>
                                        <p className='friendLocation'>Location is too long for this box</p>
                                    </figure>
                                </div>
                                <div className='friendHeaderRow'>
                                    <p className='friendHeader'>Friend List</p>
                                    <Link to="/friends">
                                        <button className='viewMore'>View <span>103</span> more</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <figure id="modalBox1" className={modalVisible ? "modalBox1" : "modalBox1 hidden"}>
                        {/* onClick={() => setModalVisible(false)} */}

                        <div className='sliderMedia'>
                            <Carousel
                                images={images}
                                style={{height: 450, width: 700}}
                                hasIndexBoard="false"
                                canAutoPlay="false"
                                hasCaptions="true"
                                hasMediaButton="topRight"
                                autoPlayInterval="3000"
                                hasSizeButton="false"
                            >
                            </Carousel>
                        </div>
                        <figcaption className='sliderText'>Dogs are domesticated mammals, not natural wild animals. They
                            were originally bred from wolves. They have been bred by humans for a long time, and were
                            the first animals ever to be domesticated.
                        </figcaption>
                    </figure>
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

function ProfilePic({profile, token, loadData}) {
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

        loadData();
    }

    // const picker = <input type={"file"} accept={'image/*'} onChange={uploadFile}/>
    // {picker}

    return (
        <div className='profilePic'>
            
            <div className='colorBlock1'></div>
            <img className="profileImg" src={profile.profile_url} alt='placeholder'/>
            <p className='contactName'>{profile.name}</p>
        </div>
    )
}

function ProfileInfo({profile}) {
    return (
        <div className='bioColumn'>
            <div className='colorBlock4'></div>
            <Link to="/editprofile" className='editAccount'><ManageAccountsIcon sx={{ fontSize: 35 }}/></Link>
            <div className='bioWhite'>
                <p className='contactHead'>Birth Date:</p>
                <p className='contactDate'>{profile.birthdate}</p>
                <p className='contactHead'>Birth Place:</p>
                <p className='contactLoc'>{profile.birthplace}</p>
                <p className='contactHead'>Current Location:</p>
                <p className='contactNow'>{profile.current_location}</p>
            </div>
            <p className='contactBio'>Profile Info</p>
        </div>
    )
}