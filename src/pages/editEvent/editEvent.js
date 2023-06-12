import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom"
import './editEvent.css'
import NavTabs from "../../components/Navbar";

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import {backendHost, sendJSONRequest} from "../../utils/helpers";

export default function EventEdit() {
    const [file, setFile] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const token = localStorage.getItem('token');
    const [images, setImages] = useState([]);
    const [avatar, setAvatar] = useState('');
    const [sendToTimeline, setSendToTimeline] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(false);


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
        window.scrollTo(0, 0);
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

        setInterval(() => {
            setSendToTimeline(true);
        }, 1000);
    } ;

    if (sendToTimeline) {
        return (
            <Navigate to={'/timeline'} />
        )
    }

    const uploadPhoto = async (e) => {
        e.preventDefault();
        if (!file) {
            return;
        }
        console.log(file);
        const newImages = images.slice();

        const formData = new FormData();
        formData.append('photo', file);
        try {
            const res = await fetch(`${backendHost}/api/event/addPhoto/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                },
                body: formData,
            })
            if (res.status !== 200) {
                console.log("failed to upload new event photo");
                return;
            }
            const {url} = await res.json();
            console.log(url);
            newImages.push({src: url, alt: "event gallery image"});
            console.log(newImages);

        } catch (err) {
            console.log(err);
        }

        setImages(newImages);

    };

    const deleteEvent = async (e) => {
        e.preventDefault();
        try {
            const res = await sendJSONRequest('DELETE', `/api/event/delete/${id}`, null, true)
            if (res.status !== 200) {
                console.log("failed to delete the event");
                return;
            }
            setDeleteMessage(true);
            setInterval(() => {
                setSendToTimeline(true);
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    }

    if (sendToTimeline) {
        return <Navigate to={'/timeline'} />
    }

    return (
        <>
            <div className="mainEditBlock">
            <div id='blackOut' className={modalVisible ? "blackOut" : "blackOut hidden"}
                         onClick={() => setModalVisible(false)}>
            </div>
            <div className={modalVisible ? "" : "hidden"}>
            <div className='youSure'>
                <h4 className='butAreYou'>Are you sure you want to delete this event?</h4>
                <div className='cancelDelete'>
                    <button className='cancelButton' onClick={() => setModalVisible(false)}>Cancel</button>
                    <button className='deleteEventButton' onClick={deleteEvent}>Delete</button>
                </div>
                <p className={deleteMessage ? "" : "hidden"}>Event Deleted, redirecting to Timeline...</p>
            </div>
            </div>
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
                    <div className='editEventForm'>
                        <h2 className='editHeader'>Edit your Event</h2>
                        <label htmlFor="editEventTitle">Upload more photos:</label>
                        <div>
                            <input type={'file'} accept={'image/*'} onChange={e => setFile(e.target.files[0])}/>
                            <button className={'updateEventButton'} onClick={uploadPhoto}>Confirm Photo</button>
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
                            <button type={'submit'} className='updateEventButton' onClick={handleFormSubmit}>Save
                                Event
                            </button>
                            <button className='deleteEventButton' onClick={() => setModalVisible(true)}>Delete Event</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
