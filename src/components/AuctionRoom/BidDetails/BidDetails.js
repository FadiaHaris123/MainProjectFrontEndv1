import React, { useState } from 'react';
import classes from './BidDetails.module.css';
import { IoMdArrowDropupCircle } from 'react-icons/io';
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axios';
import { UpdateModeEnum } from 'chart.js';
import { useEffect } from 'react';



const BidDetails = (props) => {
    useEffect(() => {
        const bidding = setInterval(() => {
            function getId() {
                axios.get(geturl, {
                    headers: {
                        'Authorization': token
                    }
                }).then((response) => {
                    setId(response.data._embedded.auction[0].id)
                    setCurrentAmount(response.data._embedded.auction[0].currentBid)
                    console.log("data", response.data._embedded.auction[0].id)
                    console.log("au_id", id)
                }); 
            }
            getId();
        }, 50);
        return () => clearInterval(bidding);
    }, [])


    //initial amount obtained from temporary auction table
    const [currentAmount, setCurrentAmount] = useState(props.amount * 0.05)
    const [customAmount, setCustomAmount] = useState()
    const [id, setId] = useState(null)
    let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
    const url = `http://localhost:8080/auction/update`
    const geturl = `http://localhost:8080/auction`

    const sendValue = (e) => {
        setCurrentAmount(parseInt(e.target.value) + currentAmount);
        update(e);
    }

    const update = (e) => {
            axios.put(url, {
                id: id,
                chittyId: props.chittyId,
                userId: props.userId,
                currentBid: parseInt(e.target.value) + currentAmount
            },
                {
                    headers: {
                        'Authorization': token
                    }
                })
    }

    const submit = (e) => {
        e.preventDefault();
        setCurrentAmount(currentAmount + parseInt(customAmount))
        axios.put(url, {
            id: id,
            chittyId: props.chittyId,
            userId: props.userId,
            currentBid: currentAmount + parseInt(customAmount)
        },
            {
                headers: {
                    'Authorization': token
                }
            })
    }

    const customAmountHandler = (e) => {
        setCustomAmount(e.target.value)
        console.log(e.target.value)
    }


    return (
        <React.Fragment>
            <div className={classes.bidcontainer}>
                <div className={classes.bidhistory}>
                    <h3>Bidding On Air !!!</h3>
                    <div className={classes.currentBid}>
                        <label><IoMdArrowDropupCircle color='green' size={20} />Current Bid Amount (in ₹)</label>
                        <input className={classes.bidamount} value={currentAmount} readOnly />
                    </div>
                </div>
                <div className={classes.buttongrp}>
                    <div className={classes.hundreds}>
                        <button type='submit' value={100} onClick={sendValue}>+100</button>
                        <button type='submit' value={200} onClick={sendValue}>+200</button>
                        <button type='submit' value={500} onClick={sendValue}>+500</button>
                    </div>
                    <div className={classes.thousand}>
                        <button type='submit' value={1000} onClick={sendValue}>+1,000</button>
                        <button type='submit' value={5000} onClick={sendValue}>+5,000</button>
                        <button type='submit' value={10000} onClick={sendValue}>+10,000</button>
                    </div>
                    <div className={classes.customamount}>
                        <label>Custom amount (in ₹)</label>
                        <form onSubmit={submit}>
                            <input placeholder='Enter Amount' value={customAmount} onChange={customAmountHandler} />
                            <button className={classes.send} type='submit'><AiOutlineSend size={20} /></button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BidDetails;