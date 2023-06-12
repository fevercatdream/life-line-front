/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { Link, Navigate } from "react-router-dom"
import './Profile.css'

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

import { sendJSONRequest } from "../../utils/helpers";
import NavTabs from '../../components/Navbar/index';
import { Searchbar } from "../../components/Searchbar"

import Chat from '@mui/icons-material/Chat';
import Favorite from '@mui/icons-material/Favorite';
import PersonAddAlt1 from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// eslint-disable-next-line
import Search from '@mui/icons-material/Search';
// eslint-disable-next-line
import { Message, Clear } from '@mui/icons-material';
import HighlightOff from "@mui/icons-material/HighlightOff";

import dateFormat from 'dateformat';

const noFace = require('../assets/noimageface.png')
const noRecent = require('../assets/noimagerecent.png')
const noFriends = require('../assets/nofriends.png')
const noFriends2 = require('../assets/nofriends2.png')


export default function Profile() {
    const [modalVisible, setModalVisible] = useState(false);
    const [notifVisible, setNotifVisible] = useState(false);
    const [likeNotifVisible, setLikeVisible] = useState(false);
    const [friendNotifVisible, setFriendVisible] = useState(false);
    const [profile, setProfile] = useState();
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);

    const [comment, setComment] = useState([]);
    const [like, setLike] = useState([]);

    const [friend, setFriend] = useState([]);
    const [user, setUser] = useState([]);

    const token = localStorage.getItem('token');

    const loadData = async () => {
        if (!token) {
            return;
        }

        const res = await sendJSONRequest('GET', '/api/profile', null, true);
        if (res.status !== 200) {
            // handle errors
            console.log("something went wrong");
            return;
        }

        const p = await res.json();
        setProfile(p);
        setLoading(false);
        setComment(p.comments);
        setLike(p.likes);
    }


    const loadDataEvent = async () => {
        const res = await sendJSONRequest('GET', '/api/timeline/view', null, true);
        if (res.status !== 200) {
            console.log('something went wrong, could not load data');
            return;
        }
        const data = await res.json();
        setEvent(data);

    }

    const loadDataFriends = async () => {
        const res = await sendJSONRequest('GET', '/api/friends/', null, true);
        const data = await res.json();
        setFriend(data);
    }

    const loadDataUser = async () => {
        const res = await sendJSONRequest('GET', '/api/friends/all-users', null, true);
        const data = await res.json();
        setUser(data)
    }

    const clearFriendRequest = (friendId) => {
        const p = { ...profile }
        const idx = p.pending_friends.findIndex(x => x.friendId === friendId);
        p.pending_friends.splice(idx, 1);
        p.new_friend_requests--;
        setProfile(p);
    };

    const messagesRef = useRef(null)

    useEffect(() => {
        if (messagesRef.current) {

            messagesRef.current.scrollTop = 0;
        }
    }, [profile]);

    useEffect(() => {
        loadData();
        loadDataEvent();
        loadDataFriends();
        loadDataUser();
    }, [token])

    if (!token) {
        return (
            <Navigate to={'/'} />
        )
    }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    let pendingFriendsEls = <span>New friend requests will appear here.</span>;

    if (profile && profile.pending_friends && profile.pending_friends.length > 0) {
        pendingFriendsEls = profile.pending_friends.map(i =>
            <PendingFriend pendingFriendRequest={i} clearFriendRequest={() => clearFriendRequest(i.friendId)} />);
    }

    // for Likes

    let likesEls = "";

    let likesStorage = localStorage.getItem("like_id")?.split(" ").map(id => parseInt(id)) ?? [];

    let filteredLikes = like.filter(like => !likesStorage.includes(like.id))

    function handleLikesDissmiss(commentId) {
        setComment(like.filter(c => c.id !== commentId))
    }

    if (like.length > 0) {
        likesEls = filteredLikes.map(i =>
            <Like like={i} onLikeDismiss={handleLikesDissmiss} />);

    }


    // for comments

    let commentsEls = "";

    let commentsStorage = localStorage.getItem("comment_id")?.split(" ").map(id => parseInt(id)) ?? [];

    let filteredComments = comment.filter(comment => !commentsStorage.includes(comment.id))

    // comments dismiss

    function handleCommentDissmiss(commentId) {
        setComment(comment.filter(c => c.id !== commentId))
    }



    if (comment.length > 0) {

        commentsEls = filteredComments.sort((ca, cb) => new Date(ca.createdAt) - new Date(cb.createdAt)).reverse().map(i =>
            <Comment comment={i} onCommentDismiss={handleCommentDissmiss} />);
    }

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
                        onClick={() => setModalVisible(false)}>
                    </div>
                    <div className='navBackground'></div>
                    <NavTabs />
                    <div className='profilePicBox'>
                        <div className='profileBox'>
                            <ProfilePic profile={profile} />
                            <ProfileInfo profile={profile} />
                            <div className='suggestBox'>
                                <figure className='suggestFriend'>
                                    <img className='suggestFriend1' src={user?.users?.[2]?.profilePhoto ?? noFriends2}
                                        alt='placeholder' />
                                    <p className='friendName'>{user?.users?.[2]?.name ?? ''}</p>
                                </figure>
                                <figure className='suggestFriend'>
                                    <img className='suggestFriend1' src={user?.users?.[3]?.profilePhoto ?? noFriends2}
                                        alt='placeholder' />
                                    <p className='friendName'>{user?.users?.[3]?.name ?? ''}</p>
                                </figure>
                                <figure className='suggestFriend'>
                                    <img className='suggestFriend1' src={user?.users?.[4]?.profilePhoto ?? noFriends2}
                                        alt='placeholder' />
                                    <p className='friendName'>{user?.users?.[4]?.name ?? ''}</p>
                                </figure>
                                <figure className='suggestFriend'>
                                    <img className='suggestFriend1' src={user?.users?.[5]?.profilePhoto ?? noFriends2}
                                        alt='placeholder' />
                                    <p className='friendName'>{user?.users?.[5]?.name ?? ''}</p>
                                </figure>
                            </div>
                            <div className='colorBlock5'>
                                <p className='mayKnow'>Users you may know</p>
                            </div>
                        </div>
                        <div className='bioBox'>
                            <div className='notifSearchBox'>
                                <div className='notifEvent'>
                                    <div className='notifRow' onClick={() => {
                                        notifVisible ? setNotifVisible(false) : setNotifVisible(true);
                                        setLikeVisible(false);
                                        setFriendVisible(false);
                                    }}>
                                        <p className='notifys'>{filteredComments.length}</p>
                                        <Chat sx={{ fontSize: 25 }} className='commentBtn' />
                                    </div>
                                    <div className='notifRow' onClick={() => {
                                        likeNotifVisible ? setLikeVisible(false) : setLikeVisible(true);
                                        setNotifVisible(false);
                                        setFriendVisible(false);
                                    }}>
                                        <p className='notifys'>{filteredLikes.length}</p>
                                        <Favorite sx={{ fontSize: 25 }} className='likeBtn' />
                                    </div>
                                    <div className='notifRow' onClick={() => {
                                        friendNotifVisible ? setFriendVisible(false) : setFriendVisible(true);
                                        setNotifVisible(false);
                                        setLikeVisible(false);
                                    }}>
                                        <p className='notifys'>{profile.new_friend_requests}</p>
                                        <PersonAddAlt1 sx={{ fontSize: 30 }} className='addBtn' />
                                    </div>
                                </div>
                                {/* only search on friends page, currently --- more complex to set up on profile page */}
                                {/* <div className='flexRow'>
                                    <Searchbar onChange={handleSearchChange}/>
                                </div> */}
                            </div>

                            <div className={notifVisible ? "commentModal" : "commentModal hidden"} ref={messagesRef}>
                                {commentsEls}
                                <span> Comment notifications will appear here.</span>
                            </div>
                            <div className={likeNotifVisible ? "likeModal" : "likeModal hidden"}>
                                {likesEls}
                                <span>Like notifications will appear here.</span>
                            </div>
                            <div className={friendNotifVisible ? "newFriendModal" : "newFriendModal hidden"}>
                                {pendingFriendsEls}
                            </div>
                            <div className='recentBox'>
                                <figure id="recentCard" className='recentCard'
                                // onClick={() => setModalVisible(true)}
                                >
                                    <div className='recentCardBox'>
                                        <div className='smallMediaContainer2'>
                                            <img className='recentMedia' src={event?.eventList?.[0]?.photos[0].url ?? noRecent}
                                                alt='placeholder' />
                                        </div>
                                    </div>
                                    <figcaption className='recentCaption'> {event?.eventList?.[0]?.description ?? "Your future event description"}
                                    </figcaption>
                                    <div className='recentComReac'>
                                        <p className='comments'>{event?.eventList?.[0]?.commentsCount ?? "0"}</p>
                                        <Chat sx={{ fontSize: 25 }} className='commentBtn' />
                                        <p className='likes'>{event?.eventList?.[0]?.likeCount ?? "0"}</p>
                                        <Favorite sx={{ fontSize: 25 }} className='likeBtn' />
                                    </div>
                                </figure>
                                <div className='recentManyDiv'>
                                    <figure className='recentMany1'>
                                        <div className='smallMediaContainer'>
                                            <img className='recentMediaSmall' src={event?.eventList?.[1]?.photos[0].url ?? noRecent}
                                                alt='placeholder' />
                                        </div>
                                        <div className='recentComReac'>
                                            <p className='comments2'>{event?.eventList?.[1]?.commentsCount ?? "0"}</p>
                                            <Chat sx={{ fontSize: 20 }} className='commentBtn' />
                                            <p className='likes2'>{event?.eventList?.[1]?.likeCount ?? "0"}</p>
                                            <Favorite sx={{ fontSize: 20 }} className='likeBtn' />
                                        </div>
                                    </figure>
                                    <figure className='recentMany3'>
                                        <div className='smallMediaContainer'>
                                            <img className='recentMediaSmall' src={event?.eventList?.[2]?.photos[0].url ?? noRecent}
                                                alt='placeholder' />
                                        </div>
                                        <div className='recentComReac'>
                                            <p className='comments2'>{event?.eventList?.[2]?.commentsCount ?? "0"}</p>
                                            <Chat sx={{ fontSize: 20 }} className='commentBtn' />
                                            <p className='likes2'>{event?.eventList?.[2]?.likeCount ?? "0"}</p>
                                            <Favorite sx={{ fontSize: 20 }} className='likeBtn' />
                                        </div>
                                    </figure>
                                    <figure className='recentMany2'>
                                        <div className='smallMediaContainer'>
                                            <img className='recentMediaSmall' src={event?.eventList?.[3]?.photos[0].url ?? noRecent}
                                                alt='placeholder' />
                                        </div>
                                        <div className='recentComReac'>
                                            <p className='comments2'>{event?.eventList?.[3]?.commentsCount ?? "0"}</p>
                                            <Chat sx={{ fontSize: 20 }} className='commentBtn' />
                                            <p className='likes2'>{event?.eventList?.[3]?.likeCount ?? "0"}</p>
                                            <Favorite sx={{ fontSize: 20 }} className='likeBtn' />
                                        </div>
                                    </figure>
                                    <figure className='recentMany4'>
                                        <div className='smallMediaContainer'>
                                            <img className='recentMediaSmall' src={event?.eventList?.[4]?.photos[0].url ?? noRecent}
                                                alt='placeholder' />
                                        </div>
                                        <div className='recentComReac'>
                                            <p className='comments2'>{event?.eventList?.[4]?.commentsCount ?? "0"}</p>
                                            <Chat sx={{ fontSize: 20 }} className='commentBtn' />
                                            <p className='likes2'>{event?.eventList?.[4]?.likeCount ?? "0"}</p>
                                            <Favorite sx={{ fontSize: 20 }} className='likeBtn' />
                                        </div>
                                    </figure>
                                </div>
                            </div>
                            <div className='colorBlock2'></div>
                            <div className='recentText'><p class="textBar">Recent Events</p></div>
                            <div className='friendBox'>
                                <div className='friendRow'>
                                    <figure className='friendCard'>
                                        <img className='friendSmall' src={friend?.friends?.[0]?.profilePhoto ?? noFriends}
                                            alt='placeholder' />
                                        <p className='friendName'>{friend?.friends?.[0]?.name ?? ''}</p>
                                    </figure>
                                    <figure className='friendCard'>
                                        <img className='friendSmall' src={friend?.friends?.[1]?.profilePhoto ?? noFriends}
                                            alt='placeholder' />
                                        <p className='friendName'>{friend?.friends?.[1]?.name ?? ''}</p>
                                    </figure>
                                    <figure className='friendCard'>
                                        <img className='friendSmall' src={friend?.friends?.[2]?.profilePhoto ?? noFriends}
                                            alt='placeholder' />
                                        <p className='friendName'>{friend?.friends?.[2]?.name ?? ''}</p>
                                    </figure>
                                    <figure className='friendCard'>
                                        <img className='friendSmall' src={friend?.friends?.[3]?.profilePhoto ?? noFriends}
                                            alt='placeholder' />
                                        <p className='friendName'>{friend?.friends?.[3]?.name ?? ''}</p>
                                    </figure>
                                    <figure className='friendCard'>
                                        <img className='friendSmall' src={friend?.friends?.[4]?.profilePhoto ?? noFriends}
                                            alt='placeholder' />
                                        <p className='friendName'>{friend?.friends?.[4]?.name ?? ''}</p>
                                    </figure>
                                </div>
                            </div>
                            <div className='colorBlock3'></div>
                            <div className='friendHeaderRow'>
                                <p className='friendHeader'>Friend List</p>
                                <Link to="/friends">
                                    <button className='viewMore'>View more</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <figure id="modalBox1" className={modalVisible ? "modalBox1" : "modalBox1 hidden"}>
                        {/* onClick={() => setModalVisible(false)} */}

                        <div className='sliderMedia'>
                            <Carousel
                                images={images}
                                style={{ height: 450, width: 700 }}
                                hasIndexBoard="false"
                                canAutoPlay="false"
                                hasCaptions="true"
                                hasMediaButton="topRight"
                                autoPlayInterval="3000"
                                hasSizeButton="false"
                                className="largePlayer"
                            >
                            </Carousel>
                            <Carousel
                                images={images}
                                style={{ height: 325, width: 500 }}
                                hasIndexBoard="false"
                                canAutoPlay="false"
                                hasCaptions="true"
                                hasMediaButton="topRight"
                                autoPlayInterval="3000"
                                hasSizeButton="false"
                                className="mediumPlayer"
                            >
                            </Carousel>
                            <Carousel
                                images={images}
                                style={{ height: 175, width: 315 }}
                                hasIndexBoard="false"
                                canAutoPlay="false"
                                hasCaptions="true"
                                hasMediaButton="topRight"
                                autoPlayInterval="3000"
                                hasSizeButton="false"
                                className="smallPlayer"
                            >
                            </Carousel>
                            <div className='eventNotifBar'>
                                <div className='commentSection'>

                                </div>
                            </div>
                        </div>
                    </figure>
                </div>
            </div>
        </>
    );
}

function ProfilePic({ profile }) {
    return (
        <div className='profilePic'>
            <div className='colorBlock1'></div>
            <img className="profileImg" src={profile.profile_url ?? noFace} alt='placeholder' />
            <p className='contactName'>{profile.name}</p>
        </div>
    )
}

function ProfileInfo({ profile }) {
    return (
        <div className='bioColumn'>
            <div className='colorBlock4'></div>
            <Link to="/editprofile" className='editAccount'><ManageAccountsIcon sx={{ fontSize: 35 }} /></Link>
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

function PendingFriend({ pendingFriendRequest, clearFriendRequest }) {
    const addFriend = async () => {
        try {
            const res = await sendJSONRequest('POST', '/api/friends/resolve-request', {
                friendId: pendingFriendRequest.friendId,
                acceptRequest: true,
            }, true)

            if (res.status !== 200) {
                console.log('something went wrong, non 200 returned');
                return;
            }

            clearFriendRequest();
        } catch (err) {
            console.log(err);
        }


    }

    const declineFriend = async () => {
        try {
            const res = await sendJSONRequest('POST', '/api/friends/resolve-request', {
                friendId: pendingFriendRequest.friendId,
                acceptRequest: false,
            }, true)

            if (res.status !== 200) {
                console.log('something went wrong, non 200 returned');
                return;
            }

            clearFriendRequest();
        } catch (err) {
            console.log(err);
        }


    }

    return (
        <div className='profileFriendNotif'>
            <div className='notifRow'>
                <div className='friendSmallContainer'>
                    <img className='friendSmall2' src={pendingFriendRequest.profilePhoto} alt='placeholder'></img>
                </div>
                <div className='contentContainer'>
                    <h3 className='commentNotifUser'>{pendingFriendRequest.name}</h3>
                    <p className='currentTime'><i>{dateFormat(pendingFriendRequest.createdAt, "mmmm dS, yyyy")}</i></p>
                </div>
            </div>
            <div className='friendOptions'>
                <div className='centeredIcon' onClick={addFriend}>
                    <PersonAddAlt1 sx={{ fontSize: 30 }} className='commentBtn2' />
                </div>
                <div className='centeredIcon2' onClick={declineFriend}>
                    <HighlightOff sx={{ fontSize: 30 }} className='commentBtn2' />
                </div>
            </div>
        </div>
    )
}

function Like({ like, onLikeDismiss }) {

    function fillStorage() {
        localStorage.setItem(`like_id`, localStorage.getItem("like_id") + ` ${like.id}`);
        onLikeDismiss(like.id);
    }

    return (
        <div className='profileLikeNotif'>
            <div className='notifRow'>
                <div className='friendSmallContainer'>
                    <img className='friendSmall2' src={like.User.profilePhoto}
                        alt='placeholder'></img>
                </div>
                <div className='contentContainer'>
                    <h3 className='commentNotifUser'>{like.User.name}</h3>
                    <p className='currentTime2'><b>Liked your Post :</b> {like.Event.title}</p>
                    <p className='currentTime'><i>{dateFormat(like.createdAt, "mmmm dS, yyyy")}</i></p>
                </div>
            </div>
            <div className='centeredIcon'>
                <Clear sx={{ fontSize: 30 }} className='commentBtn2' onClick={fillStorage} />
            </div>
        </div>
    )
}

function Comment({ comment, onCommentDismiss }) {

    function fillStorage() {
        localStorage.setItem(`comment_id`, localStorage.getItem("comment_id") + ` ${comment.id}`);
        onCommentDismiss(comment.id);
    }

    return (
        <div className='profileCommentNotif'>
            <div className='notifRow'>
                <div className='friendSmallContainer'>
                    <img className='friendSmall2' src={comment.User.profilePhoto}
                        alt='placeholder'></img>
                </div>
                <div className='contentContainer'>
                    <h3 className='commentNotifUser'>{comment.User.name}</h3>
                    <p className='currentTime2'><b>Commented on :</b> {comment.Event.title}</p>
                    <p className='currentTime'><i>{comment.comment}</i></p>
                </div>
            </div>
            <div className='centeredIcon'>
                <Clear sx={{ fontSize: 30 }} className='commentBtn2' onClick={fillStorage} />
            </div>
        </div>
    )
}