import React from 'react';
import Navbar from './Navbar';
import classes from './ManagerPage.module.css'
import { Fragment } from 'react';
function ManagerPage() {
    return (
      <Fragment>
        <Navbar />
        <h3 className={classes.heading}>The best way to predict the future is to create it!</h3>
        <div className={classes.bimg}>
        </div>
       
      </Fragment>
    );
}

export default ManagerPage;
