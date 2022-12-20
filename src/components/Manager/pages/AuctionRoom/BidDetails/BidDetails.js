import React, { useState } from 'react';
import classes from './BidDetails.module.css';
import {IoMdArrowDropupCircle} from 'react-icons/io';
import {AiOutlineSend} from 'react-icons/ai';



const BidDetails = () =>{
  
    //initial amount obtained from temporary auction table
    
    const [currentAmount,setCurrentAmount] = useState(0)
   
    return(
        <React.Fragment>
            <div className={classes.bidcontainer}>
                <div className={classes.bidhistory}>
                    <h3>Bidding On Air !!!</h3>
                    <div className={classes.currentBid}>
                    <label><IoMdArrowDropupCircle color='green' size={20}/>Current Bid Amount</label>
                    <input className={classes.bidamount} value={currentAmount} readOnly/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BidDetails;