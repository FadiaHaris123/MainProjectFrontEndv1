import React, { useState, useCallback } from 'react';
import classes from './Chit.module.css';
import ChitManage from './ChitManage';
const Chit = (props) => {

    const [chits, setChit] = useState([]);
    const managechits = () => {
        const loadedChit = [];
        loadedChit.push({
            members: props.members,
            days: props.days,
            startDate: props.startDate,
        });
        setChit(loadedChit);
    }
    let content = <ChitManage chits={chits} />
    return (
        <div>
            <li className={classes.chit}>
                <h2>{props.chitType}</h2>
                <h3>Chit No. : {props.chitNumber}</h3>
                <p>₹{props.amount}</p>
                <button className="manager-button-groups" onClick={managechits}>Manage Chit</button>
                {content}
            </li>
        </div>
    );
};

export default Chit;
