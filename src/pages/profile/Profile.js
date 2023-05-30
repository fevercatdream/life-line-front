import React, { useState } from 'react';
import { Link } from "react-router-dom"
import './Profile.css'

export default function Profile() {

    return (
        <>
        <div className="mainProfileBlock">

            <div className='profileblock'> 
                <header className='profileHeader'>
                    <p>header</p>
                </header>
                <div className='profileBox'>
                            <div className='profilePicBox'>
                                <img className='profilePic' src="http://placekitten.com/300/300"></img>
                            </div>
                            
                    <div className='bioBox'>
                            <div className='flexRow'>
                                <div className='contactMini'>
                                    <p className='contactHead'>Name:</p>
                                    <p className='contactName'>Snowball McKitten</p>
                                </div>
                                <div className='contactMini'>
                                    <p className='contactHead'>Birth Date:</p>
                                    <p className='contactDate'>May 1<sup>st</sup>, 2023</p>
                                </div>
                                <div className='contactMini'>
                                <p className='contactHead'>Birth Place:</p>
                                <p className='contactLoc'>Seattle, Washington</p>
                                </div>
                            </div>
                            <div className='bioDesc'>
                                <h3>About Me:</h3>
                                <p>Hi, my name is Snowball and I am a very tiny kitten. I come from a long line of hunting cats and my favorite toy is the yarn ball.Hi, my name is Snowball and I am a very tiny kitten. I come from a long line of hunting cats and my favorite toy is the yarn ball.Hi, my name is Snowball and I am a very tiny kitten. I come from a long line of hunting cats and my favorite toy is the yarn ball.Hi, my name is Snowball and I am a very tiny kitten. I come from a long line of hunting cats and my favorite toy is the yarn ball.Hi, my name is Snowball and I am a very tiny kitten. I come from a long line of hunting cats and my favorite toy is the yarn ball. Hi, my name is Snowball and I am a very tiny kitten. I come from a long line of hunting cats and my favorite toy is the yarn ball.Hi, my name is Snowball and I am a very tiny kitten. I come from a long line of hunting cats and my favorite toy is the yarn ball.</p>
                            </div>
                    </div>
                </div>
                <div className='recentBox'>
                    <p>recent events</p>
                </div>
                <div className='friendBox'>
                    <p>friends</p>
                </div>
                <div className='suggestBox'>
                    <p>suggested friends</p>
                </div>
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