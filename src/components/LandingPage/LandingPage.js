import React from 'react'
import { Link } from 'react-router-dom'

import './LandingPage.css'
import BackgroundImage from '../../assets/images/BigImage.jpg'

export default function LandingPage() {
    localStorage.setItem('userId', '');
    localStorage.setItem('managerId', '');
    return (
        <div className='full'>
        <header style={ HeaderStyle }>
            
            <div className='overlay'>
                <h1 className="main-title text-center">EMINENCE CHITTY</h1>
                <p className="main-para text-center">join us now</p>
                <div className="buttons text-center">
                    <Link to="/login">
                        <button className="primary-button" id="log_btn"><span>log in</span></button>
                    </Link>
                    <Link to="/register">
                        <button className="primary-button" id="reg_btn"><span>register </span></button>
                    </Link>
                </div>
                <p className='info'>A unique financial savings scheme, designed to ensure safe savings of 
                your hard earned money. A chitty scheme with insurance coverage and pension plan, software
                 that allows you to join chits, pay installments, and take part in chitty auction from 
                 anywhere, anytime.</p>
            </div>
        </header>
        </div>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition:'fixed',
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundAttachment: "fixed",
}