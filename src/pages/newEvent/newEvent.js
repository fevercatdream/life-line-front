import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom"
import './newEvent.css'
import NavTabs from "../../components/Navbar";

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import {backendHost} from "../../utils/helpers";

export default function EventNew() {

    const images = [9, 8, 7, 6, 5].map((number) => (
        {
            src: `https://placedog.net/${number}00/${number}00?id=${number}`,
            // srcset: `https://placedog.net/400/240?id=1 400w, https://placedog.net/700/420?id=1 700w, https://placedog.net/1000/600?id=1 1000w`,
            // sizes: '(max-width: 1000px) 400px, (max-width: 2000px) 700px, 1000px',
            alt: `Dogs are domesticated mammals, not natural wild animals. They were originally bred from wolves. They have been bred by humans for a long time, and were the first animals ever to be domesticated.`,
            // thumbnail: `https://placedog.net/100/60?id=1`
        }
    ));

    const [file, setFile] = useState();
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [eventDate, setEventDate] = useState();
    const [sendToTimeline, setSendToTimeline] = useState(false);

    const filePicker = <input type={'file'} accept={'image/*'} onChange={e => setFile(e.target.files[0])}/>;

    const [inputs, setInputs] = useState([filePicker]);

    const addInput = () => {
        console.log("adding input");
        const i = inputs.slice()
        i.push(filePicker);
        console.log(inputs);
        setInputs(i);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        console.log(title, desc, eventDate, file);
        const f = new FormData();
        const token = localStorage.getItem('token');
        f.set('photo', file);
        f.set('date', eventDate);
        f.set('title', title);
        f.set('description', desc);
        await fetch(`${backendHost}/api/event/create`, {
            method: 'POST',
            headers: {
                'Authorization': token,
            },
            body: f,
        })
        setSendToTimeline(true);
    }

    if(sendToTimeline) {
        return (
            <Navigate to={'/timeline'} />
        )
    }

    return (
        <>
        <div className="mainEditBlock">
            <div className='navBackground'></div>
            <NavTabs/>
            <div className='flexRow3'>
            <div className='editBlock2'>
                <div className='navBackground'></div>
                <figure id="modalBox2" className="modalBox2">
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
                                className="largePlayer"
                            >
                            </Carousel>
                            <Carousel
                                images={images}
                                style={{height: 325, width: 500}}
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
                                style={{height: 175, width: 315}}
                                hasIndexBoard="false"
                                canAutoPlay="false"
                                hasCaptions="true"
                                hasMediaButton="topRight"
                                autoPlayInterval="3000"
                                hasSizeButton="false"
                                className="smallPlayer"
                            >
                            </Carousel>
                        </div>
                    </figure>
                <div className="timeLineEvent3">
                    <figure className="noMargin">
                        <img className="timelineThumb" src="https://dummyimage.com/300x200/000/aaa" alt={'timeline'}></img>
                    </figure>
                    <div className="timelineInfo">
                        <div className='flexRow2'>
                            <h2 className="timelineTitle">Learned Latin</h2>
                        </div>
                        <p className="timelineDesc2">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </div>
            <div className='editEventForm'>
                <h2 className='editHeader'>Share a new Event</h2>
                <label htmlFor="editPhoto">Choose which images to upload:</label>
                <button className='updateEventButton' onClick={addInput}>Add Multiple Files</button>
                <div className='inputButtons'>
                    {inputs}
                </div>
                <label htmlFor="editEventTitle">Title your event:</label>
                <input className='editEventTitle' placeholder='Event Title' onChange={e => setTitle(e.target.value)}></input>
                <label htmlFor="editEventTitle">Summarize your event:</label>
                <textarea className='editEventDesc' placeholder='Event Description' onChange={e => setDesc(e.target.value)}></textarea>
                <label htmlFor="editEventDesc">Select the date your Event occured:</label>
                <input className="editEventDate" type='date' onChange={e => setEventDate(e.target.value)}></input>
                <button className='updateEventButton' onClick={submitForm}>Share Event</button>
            </div>
            </div>
        </div>
      </>
    );
  }
