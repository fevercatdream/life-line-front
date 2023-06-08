import React, {useState} from 'react';
import {Link} from "react-router-dom"
import './editEvent.css'
import NavTabs from "../../components/Navbar";

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import {sendJSONRequest} from "../../utils/helpers";

export default function EventEdit() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));

    const loadData = async () => {
        if (!token) {
            return;
        }
        const res = await sendJSONRequest("GET", '/api/event/', null, true);
        if (res.status !== 200) {
            // handle errors
            console.log("something went wrong");
            return;
        }

        const eventData = await res.json();
        console.log(eventData)

    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

    //     const res = await sendJSONRequest('PUT', '/api/event/update', {
    //         name: name,
    //         birthDate: birthDate,
    //         birthPlace: birthLocation,
    //         location: currentLocation,
    //     }, true);
    //     const data = await res.json();
    //
    //     if (res.status !== 200) {
    //         console.log("something went wrong");
    //         return;
    //     }
    //     // setSendToHomepage(true);
    };

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
            <div className="mainEditBlock">
                <div className='navBackground'></div>
                <NavTabs/>
                <div className='flexRow3'>
                    <div className='editBlock2'>
                        <div className='navBackground'></div>
                        <figure id="modalBox3" className="modalBox3">
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
                                <img className="timelineThumb" src="https://dummyimage.com/300x200/000/aaa"
                                     alt={'dummy'}></img>
                            </figure>
                            <div className="timelineInfo">
                                <div className='flexRow2'>
                                    <h2 className="timelineTitle">Learned Latin</h2>
                                </div>
                                <p className="timelineDesc2">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                                    eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
                                    ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum
                                    dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div className='editEventForm'>
                            <h2 className='editHeader'>Edit your Event</h2>

                            <label>Upload Photos: <br/>
                                <button className='editPhoto'>Upload Photos</button>
                            </label>
                            <label>Change your Event title: <br/>
                                <input
                                    className='editEventTitle'
                                    placeholder='Event Title'
                                    type='text'
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </label>
                            <label>Change your Event summary: <br/>
                                <textarea
                                    className='editEventDesc'
                                    placeholder='Event Description'
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </label>
                            <label>Change the date your Event occurred: <br/>
                                <input
                                    className="editEventDate"
                                    type='date'
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </label>
                            <div className='saveAndDelete'>
                                <button className='updateEventButton' onClick={handleFormSubmit}>Save Event</button>
                            </div>

                        </div>
                    </form>
                    <button className='deleteEventButton'>Delete Event</button>

                </div>

            </div>
        </>
    )
}
