import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom"
import './editEvent.css'
import NavTabs from "../../components/Navbar";

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import {sendJSONRequest} from "../../utils/helpers";

export default function EventEdit() {
    const [, setFile] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const token = localStorage.getItem('token');
    const [images, setImages] = useState([]);
    const [avatar, setAvatar] = useState('');


    const addInput = () => {
        console.log("adding input");
        const i = inputs.slice()
        i.push(filePicker);
        console.log(inputs);
        setInputs(i);
    }

    const filePicker = <input type={'file'} accept={'image/*'} onChange={e => setFile(e.target.files[0])}/>;
    const [inputs, setInputs] = useState([filePicker]);

    const loadData = async () => {
        if (!token) {
            return;
        }
        const res = await sendJSONRequest("GET", `/api/event/${id}`, null, true);
        if (res.status !== 200) {
            // handle errors
            console.log("something went wrong");
            return;
        }

        const eventData = await res.json();
        console.log(eventData)
        setTitle(eventData.title);
        setDescription(eventData.description);
        setDate(eventData.date);
        setAvatar(eventData.EventPhotos[0].eventPhotoURL)

         setImages(eventData.EventPhotos.map((i) => ({
            src: i.eventPhotoURL,
            alt: "Event img",
        })))

        // setImages(eventData.EventPhotos)

    }

    useEffect(() => {
        loadData();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [])


    let {id} = useParams();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(description, date, title);
        const res = await sendJSONRequest('PUT', `/api/event/update/${id}`, {
            description: description,
            date: date,
            title: title,
        }, true);

        if (res.status !== 200) {
            console.log("something went wrong");
            return;
        }
        // setSendToHomepage(true);
    };

    // const images = [9, 8, 7, 6, 5].map((number) => (
    //     {
    //         src: `https://placedog.net/${number}00/${number}00?id=${number}`,
    //         // srcset: `https://placedog.net/400/240?id=1 400w, https://placedog.net/700/420?id=1 700w, https://placedog.net/1000/600?id=1 1000w`,
    //         // sizes: '(max-width: 1000px) 400px, (max-width: 2000px) 700px, 1000px',
    //         alt: `Dogs are domesticated mammals, not natural wild animals. They were originally bred from wolves. They have been bred by humans for a long time, and were the first animals ever to be domesticated.`,
    //         // thumbnail: `https://placedog.net/100/60?id=1`
    //     }
    // ));

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
                                <img className="timelineThumb" src={avatar} alt="event"></img>
                            </figure>
                            <div className="timelineInfo">
                                <div className='flexRow2'>
                                    <h2 className="timelineTitle">{title}</h2>
                                </div>
                                <p className="timelineDesc2">{description}</p>
                            </div>
                        </div>
                    </div>
                    <form className='editEventForm'>
                        <h2 className='editHeader'>Edit your Event</h2>

                        <label htmlFor="editPhoto">Choose which images to add:</label>
                        <button className='editPhoto' onClick={addInput}>Add multiple files</button>
                        <div>
                            {inputs}
                        </div>

                        <label htmlFor="editEventTitle">Change your Event title:</label>
                        <input
                            className='editEventTitle'
                            placeholder='Event Title'
                            name='editEventTitle'
                            type='text'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <label htmlFor="editEventDesc">Change your Event summary:</label>
                        <textarea
                            className='editEventDesc'
                            placeholder='Event Description'
                            name='editEventDesc'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <label htmlFor="editEventDate">Change the date your Event occurred:</label>
                        <input
                            className="editEventDate"
                            type='date'
                            name='editEventDate'
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                        <div className='saveAndDelete'>
                            <button className='updateEventButton' onClick={handleFormSubmit}>Save Event</button>
                            <button className='deleteEventButton'>Delete Event</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
