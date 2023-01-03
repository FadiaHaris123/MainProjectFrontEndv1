import React from "react";
import classes from "./AuctionChitDetails.module.css"
import { AiFillCaretDown } from 'react-icons/ai';
import Timer from "./Timer/Timer";

const AuctionChitDetails = (props) => {

    const amount = (props.amount * 5) / 100;
    const maxAmount = (props.amount * 35) / 100;

    return(
        <React.Fragment>
            <div className={classes.chitdetailscontainer}>
                <div className={classes.flexboxes}>
                    <h3>Chit Number:</h3>
                    <h4>{props.chittyId}</h4>
                </div>
                <div className={classes.flexboxes}>
                    <h3>Maximum Call Allowed</h3>
                    <h4>{maxAmount}₹</h4>
                </div>
                <div className={classes.flexboxes}>
                  <h3><AiFillCaretDown color="red"/> Bid Starts at</h3>
                    <h4>{amount}₹</h4>
                </div>
                <div className={classes.flexboxes}>
                    <h3>Total Amount</h3>
                    <h4>{props.amount}₹</h4>
                </div>
                <div className={classes.flexboxes}>
                    <h3>User Id</h3>
                    <h4>{props.userId}</h4>
                </div>
                <div className={classes.flexboxes.timer}>
                    <h3 className={classes.timer}><Timer /></h3>
                </div>
            </div>
        </React.Fragment>
    )   
}

export default AuctionChitDetails;