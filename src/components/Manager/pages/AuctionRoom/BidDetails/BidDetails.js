import React, { useState } from 'react';
import classes from './BidDetails.module.css';
import { IoMdArrowDropupCircle } from 'react-icons/io';
import { AiOutlineSend } from 'react-icons/ai';
import { useEffect } from 'react';
import axios from 'axios';



const BidDetails = () => {

    let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
    //initial amount obtained from temporary auction table
    const geturl = `http://localhost:8080/auction`
    const [currentBid, setCurrentBid] = useState(null)

    useEffect(() => {
        const bidding = setInterval(() => {
            function getId() {
                axios.get(geturl, {
                    headers: {
                        'Authorization': token

                    }
                }
                ).then((response) => {
                    setCurrentBid(response.data._embedded.auction[0].currentBid)
                });
            }
            getId();
        }, 50);
        return () => clearInterval(bidding);
    })

    const [currentAmount, setCurrentAmount] = useState(0)

    return (
        <React.Fragment>
            <div className={classes.bidcontainer}>
                <div className={classes.bidhistory}>
                    <h3>Bidding On Air !!!</h3>
                    <div className={classes.currentBid}>
                        <label><IoMdArrowDropupCircle color='green' size={20} />Current Bid Amount(in ₹)</label>
                        <input className={classes.bidamount} value={currentBid} readOnly />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BidDetails;