// import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Timeline.css';

import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';


export default function TimelineFunc()  {

    // React.useEffect(() => {
    //     window.addEventListener('scroll', (event) => {
    //         for (var i = 0; i < items.length; i++) {
    //                     if (isElementInViewport(items[i])) {
    //                       items[i].classList.add("in-view");
    //     }}});
    // }, []);

    return (
      <>
      <div className="mainTimelineBlock">
        <header className='friendHead'>
                    <div className='horizontal'>
                        <h1 className='LifeLine'>Life Line</h1>
                    </div>
                    <div className='navBar'>
                        <Link to="/profile"><button className='go2Profile'>Profile</button></Link>
                        <Link to="/friends"><button className='go2Friends'>Friends</button></Link>
                        <button className='go2TimeLine'>Time Line</button>
                        <button className='logout'>Logout</button>
                    </div>
        </header>
        <div className='timelineBlock'>
        <div className='navBackground'></div>
            <Timeline position="alternate">
                <TimelineItem>
                    <TimelineOppositeContent
                        sx={{ m: 'auto 0' }}
                        align="right"
                        variant="body2"
                        color="text.secondary"
                        >
                        <h2>9:30 am</h2>
                    </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot>
                                <FastfoodIcon sx={{ fontSize: 80 }}/>
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <div className="timeLineEvent">
                                <figure className="noMargin">
                                    <img className="timelineThumb" src="https://dummyimage.com/300x200/000/aaa"></img>
                                </figure>
                                <div className="timelineInfo">
                                    <h2 className="timelineTitle">Went to Taco Bell</h2>
                                    <p className="timelineDesc">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <div className="timelineNotif">
                                        <p className='comments'><b>Comments: </b><span>5</span></p>
                                        <p className='likes'><b>Likes: </b>15</p>
                                    </div>
                                </div>
                            </div>
                        </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                        <TimelineOppositeContent
                        sx={{ m: 'auto 0' }}
                        variant="body2"
                        color="text.secondary"
                        >
                        10:00 am
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot color="primary">
                            <LaptopMacIcon />
                        </TimelineDot>
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="h6" component="span">
                            Code
                        </Typography>
                        <Typography>Because it&apos;s awesome!</Typography>
                        </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                        <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot color="primary" variant="outlined">
                            <HotelIcon />
                        </TimelineDot>
                        <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="h6" component="span">
                            Sleep
                        </Typography>
                        <Typography>Because you need rest</Typography>
                        </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                        <TimelineSeparator>
                        <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                        <TimelineDot color="secondary">
                            <RepeatIcon />
                        </TimelineDot>
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="h6" component="span">
                            Repeat
                        </Typography>
                        <Typography>Because this is the life you love!</Typography>
                        </TimelineContent>
                </TimelineItem>
            </Timeline>
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
  