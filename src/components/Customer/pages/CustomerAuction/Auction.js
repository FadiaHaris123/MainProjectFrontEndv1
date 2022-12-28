import React from 'react';
import BasicTable  from './components/BasicTable'
import Navbar from '../../Navbar';
import classes from './Auction.module.css';


//All the upcoming auctions are displayed
function Auction() {
  return (
    <div className={classes.auction}>
      <Navbar/>
      <h1>Auction Details</h1>
      <section className={classes.upcomingAuctions}>
      <h4><a href='#'>Upcoming Auctions</a></h4>
      <div>
      <BasicTable />
      </div>
      </section>
    </div>
  );
}

export default Auction;