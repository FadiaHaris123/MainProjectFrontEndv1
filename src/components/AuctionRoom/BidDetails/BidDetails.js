import React, { useState } from 'react';
import classes from './BidDetails.module.css';
import {IoMdArrowDropupCircle} from 'react-icons/io';
import {AiOutlineSend} from 'react-icons/ai';



const BidDetails = () =>{
  
    //initial amount obtained from temporary auction table
    const [currentAmount,setCurrentAmount] = useState(0)
    const [customAmount,setCustomAmount] = useState()
    
    const sendValue = (e) =>{
        setCurrentAmount(parseInt(e.target.value) + currentAmount);
    }

    const submit = (e) =>{
        e.preventDefault();
        setCurrentAmount(currentAmount + parseInt(customAmount))
    }

    const customAmountHandler = (e) =>{
        setCustomAmount(e.target.value)
        console.log(e.target.value)
    }


    return(
        <React.Fragment>
            <div className={classes.bidcontainer}>
                <div className={classes.currentbid}>
                    <h3><IoMdArrowDropupCircle color='green' size={20}/>  Current Bid</h3>
                    <div className={classes.amount}>6000</div>
                </div> 
                <div className={classes.bidhistory}>
                    <h3>Bidding On Air !!!</h3>
                    <div className={classes.currentBid}>
                        <label>Current Bid Amount :</label>
                        <input className={classes.bidamount} value={currentAmount} readOnly/>
                    </div>
                </div>
                <div className={classes.buttongrp}>
                    <div className={classes.hundreds}>
                        <button type='submit' value={100} onClick={sendValue}>+100</button>
                        <button type='submit'value={200} onClick={sendValue}>+200</button>
                        <button type='submit'value={500} onClick={sendValue}>+500</button>
                    </div>
                    <div className={classes.thousand}>
                        <button type='submit'value={1000} onClick={sendValue}>+1,000</button>
                        <button type='submit'value={5000} onClick={sendValue}>+5,000</button>
                        <button type='submit'value={10000} onClick={sendValue}>+10,000</button>
                    </div>
                    <div className={classes.customamount}>
                        <label>Custom amount </label>
                        <form onSubmit={submit}>
                            <input placeholder='Enter Amount' value={customAmount} onChange={customAmountHandler}/>
                            <button className={classes.send} type='submit'><AiOutlineSend size={20}/></button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BidDetails;