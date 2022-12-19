import React from 'react';
import classes from './BidHistory.module.css'

const BidHistory = (props) => {

return (
    <React.Fragment>
        <div className={classes.currentBid}>
          <label>Current Bid Amount :</label>
          <input className={classes.bidamount} readOnly/>
        </div>
    </React.Fragment>
  );
};

export default BidHistory;