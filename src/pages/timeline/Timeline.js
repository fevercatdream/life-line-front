/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import './Timeline.css';
import { HashLink } from 'react-router-hash-link';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Chat from '@mui/icons-material/Chat';

import Edit from '@mui/icons-material/Edit';
import LibraryAdd from '@mui/icons-material/LibraryAdd';
import {sendJSONRequest} from "../../utils/helpers";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import NavTabs from "../../components/Navbar";


export default function TimelineFunc() {

    const [eventModalVisible, setEventModalVisible] = useState(false);
    const [activeEvent, setActiveEvent] = useState();
    const [events, setEvents] = useState([]);

    const {id} = useParams();

    // React.useEffect(() => {
    //     window.addEventListener('scroll', (event) => {
    //         for (var i = 0; i < items.length; i++) {
    //                     if (isElementInViewport(items[i])) {
    //                       items[i].classList.add("in-view");
    //     }}});
    // }, []);

    const showModal = (event) => {
        setActiveEvent(event);
        setEventModalVisible(true);
    }


    const loadData = async () => {
        const path = id ? `/api/timeline/view/${id}` : '/api/timeline/view';
        const res = await sendJSONRequest('GET', path, null, true);
        if (res.status !== 200) {
            console.log('something went wrong, could not load data');
            return;
        }

        const data = await res.json();
        setEvents(data.eventList);
    }

    const eventEls = [];
    for (let i = 0; i < events.length; i++) {
        eventEls.push(<Event event={events[i]} toggle={showModal} invert={i % 2 === 1}/>)
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>

            <div className="mainTimelineBlock">
                    <div id='blackOut' className={eventModalVisible ? "blackOut2" : "blackOut2 hidden"}
                         onClick={() => setEventModalVisible(false)}></div>
                    <div className='navBackground'></div>
                    <NavTabs/>
                    <div className='horizontal'></div>
                <div className='timelineBlock'>
                    <HashLink smooth to='/timeline/#LifeLine' className='toTopBtn'><ArrowCircleUp sx={{ fontSize: 45 }} className='hover'/></HashLink>
                    <Timeline position='alternate'>
                        <div className='newEventField'>
                            <Link to="/newevent"><LibraryAdd sx={{ fontSize: 45 }} className='hover newEventBtn'/></Link>
                        </div>                        {eventEls}
                    </Timeline>
                    <Modal event={activeEvent} visible={eventModalVisible}/>
                </div>
            </div>
        </>
    );
}

function ModalComment({comment}) {
    return (
        <div className='commentSingle'>
            <div className="friendCommentIcon"><img className='friendCommentPic'
                src={comment.User.profilePhoto} alt={'profile'}></img></div>
            <div className='friendCommentBox'>
                <h4 className='friendCommentName'> {comment.User.name} :</h4>
                <p className="friendCommentText">{comment.comment}</p>
            </div>
        </div>
    )
}

function Modal({event, visible}) {
    const [commentVisible, setCommentVisible] = useState(false);
    const [comment, setComment] = useState();
    const [eventComments, setEventComments] = useState([]);
    const [liked, setLiked] = useState();
    const [likeCount, setLikeCount] = useState();

    useEffect(() => {
        if (!event) {
            return;
        }
        setLiked(event.userLiked);
        setLikeCount(event.likeCount);
        setEventComments(event.comments);

    }, [event]);

    if(!event) {
        return;
    }

    const images = event.photos.map(x => ({
        src: x.url,
        alt: 'an image',
    }))

    const comments = eventComments.map(x => <ModalComment comment={x} />)

    const uploadComment = async () => {
        if (!comment) {
            return;
        }

        const res = await sendJSONRequest('POST', '/api/comment/create', {
            eventId: event.eventId,
            comment: comment,
        }, true);
        setComment('');
        const comments = eventComments.slice();
        comments.push(await res.json());
        setEventComments(comments);
    }

    const likeEvent = async (remove) => {
        const method = remove ? 'DELETE' : 'POST';
        await sendJSONRequest(method, '/api/event/like', {
            eventId: event.eventId,
        }, true);

        if (remove) {
            setLiked(false);
            setLikeCount(likeCount - 1);
        } else {
            setLiked(true)
            setLikeCount(likeCount + 1);
        }
    }

    const likeButton = liked ?
        <Favorite sx={{fontSize: 25}} onClick={() => likeEvent(true)} /> :
        <FavoriteBorder sx={{fontSize: 25}} onClick={() => likeEvent(false)} />

    return (
        <div className='centerModal'>
            <figure id="modalBox1" className={visible ? "modalBox1" : "modalBox1 hidden"}>
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

                    <div className='eventNotifBar'>
                        <button className='leaveComment'
                                onClick={() => commentVisible ? setCommentVisible(false) : setCommentVisible(true)}>Leave
                            a Comment
                        </button>
                        <div className='flexRow'><p className='likes2'>{likeCount}</p>{likeButton}
                        </div>
                    </div>
                    <div className={commentVisible ? 'flexend' : "flexend hidden"}>
                        <textarea className="commentInput" placeholder='Thank you for sharing!' value={comment} onChange={e => setComment(e.target.value)}></textarea>
                        <button className='postBtn' onClick={uploadComment}>Post</button>
                    </div>
                    <div className='commentSection'>
                        {comments}
                    </div>
                </div>
            </figure>
        </div>
    )
}

function Event({event, toggle, invert}) {
    const d = new Date(event.date);
    const month = d.toLocaleDateString('en-us', {month: 'short'})
    const year = d.toLocaleDateString('en-us', {year: 'numeric'})
    const [likeCount, setLikeCount] = useState();
    const [commentCount, setCommentCount] = useState();

    useEffect(() => {
        if(!event) {
            return;
        }
        setLikeCount(event.likeCount)
        setCommentCount(event.commentsCount);
    }, [event])

    console.log(event.eventId);
    return (
        <TimelineItem>
            <TimelineOppositeContent
                sx={{m: 'auto 0'}}
                align="right"
                variant="body2"
                color="text.secondary"
            >
                <h2 className='timelineDate'>{month}, {year}</h2>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector/>
                <TimelineDot>
                </TimelineDot>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent sx={{py: '12px', px: 2}}>
                <div className={`timeLineEvent${invert ? '2' : ''}`}>
                    <figure className="noMargin">
                        <img className="timelineThumb" src={(event.photos && event.photos.length > 0) ? event.photos[0].url : ""}
                             onClick={() => toggle(event)} alt={'event'}></img>
                    </figure>
                    <div className="timelineInfo">
                        <div className='flexRow2'>
                            <h2 className="timelineTitle">{event.title}</h2>
                            <Link to={`/editevent/${event.eventId}/`} className='editIcon3'><Edit sx={{fontSize: 30}} className='hover'/></Link>
                        </div>
                        <p className="timelineDesc">{event.description}</p>
                        <div className="timelineNotif">
                            <p className='comments'>{commentCount}</p>
                            <Chat sx={{fontSize: 25}} className='commentBtn'/>
                            <p className='likes'>{likeCount}</p>
                            <Favorite sx={{fontSize: 25}} className='likeBtn'/>
                        </div>
                    </div>
                </div>
            </TimelineContent>
        </TimelineItem>
    )
}
