import React from 'react';
import classes from './BidDetails.module.css';
import {IoMdArrowDropupCircle} from 'react-icons/io';
import {AiOutlineSend} from 'react-icons/ai';
import BidHistory from './BidHistory';


const BidDetails = () =>{
    return(
        <React.Fragment>
            <div className={classes.bidcontainer}>
                <div className={classes.currentbid}>
                    <h3><IoMdArrowDropupCircle color='green' size={20}/>  Current Bid</h3>
                    <div className={classes.amount}>6000</div>
                </div> 
                <div className={classes.bidhistory}>
                    <h3>Bidding On Air !!!</h3>
                    <BidHistory/>
                </div>
                <div className={classes.buttongrp}>
                    <div className={classes.hundreds}>
                        <button type='submit'>+100</button>
                        <button type='submit'>+200</button>
                        <button type='submit'>+500</button>
                    </div>
                    <div className={classes.thousand}>
                        <button type='submit'>+1,000</button>
                        <button type='submit'>+5,000</button>
                        <button type='submit'>+10,000</button>
                    </div>
                    <div className={classes.customamount}>
                        <label>Custom amount </label>
                        <input placeholder='Enter Amount'/>
                        <button className={classes.send}><AiOutlineSend size={20}/></button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BidDetails;