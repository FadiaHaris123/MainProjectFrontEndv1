import React from 'react';
import classes from './Chit.module.css';

const ManageChit = (props) => {
    return (
        <div>
            <li className={classes.managechit}>
                <h1>Members : {props.members}</h1>
                <h3>Duration : {props.days} days</h3>
                <p>From {props.startDate}</p>
            </li>
        </div>
    );
};

export default ManageChit;