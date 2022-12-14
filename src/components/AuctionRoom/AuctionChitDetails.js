import React from "react";
import classes from "./AuctionChitDetails.module.css"
import { AiFillCaretDown } from 'react-icons/ai';
import Timer from "./Timer/Timer";



const AuctionChitDetails = () => {

    return(
        <React.Fragment>
            <div className={classes.chitdetailscontainer}>
                <div className={classes.flexboxes}>
                    <h3>Chit Number:</h3>
                    <h4>EC1001</h4>
                    <h4>1,00,000</h4>
                </div>
                <div className={classes.flexboxes}>
                    <h3>Maximum Discount Allowed</h3>
                    <h4>40,000</h4>
                </div>
                <div className={classes.flexboxes}>
                  <h3><AiFillCaretDown color="red"/> Bid Starts at</h3>
                    <h4>5,000</h4>
                </div>
                <div className={classes.flexboxes}>
                    <h3>Ticket No</h3>
                    <h4>24</h4>
                </div>
                <div className={classes.flexboxes}>
                    <h3>Installment</h3>
                    <h4>2</h4>
                </div>
                <div className={classes.flexboxes.timer}>
                 <h3 className={classes.timer}><Timer/></h3>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AuctionChitDetails;