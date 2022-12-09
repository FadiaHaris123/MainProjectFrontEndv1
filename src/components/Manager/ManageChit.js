import React from 'react';
import classes from './Chit.module.css';

const ManageChit = (props) => {
    return (
        <div>
            <li className={classes.managechit}>

                {/* if({props.members}<{props.totalMembers}){ } */}

                <h1>Members : {props.members}/{props.totalMembers}</h1>
                <h3>Duration : {props.days} days</h3>
                <p>From {props.startDate}</p>
                <button>Verify Members</button>
            </li>
        </div>
    );
};

export default ManageChit;