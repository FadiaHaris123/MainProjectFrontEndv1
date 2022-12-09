import { Fragment } from "react";
import React, { useState, useCallback } from 'react';
import Navbar from '../../Navbar'
import ShowDetails from "./ShowDetails";
import ChitList from '../../ChitList';
import { useEffect } from "react";

const Chitties = () => {
    const [chits, setChit] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const showDetails = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            //----------------- FOR DEMO -----------------//
            
                const response = await fetch('https://assignchits-default-rtdb.firebaseio.com/assignedchits.json');
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                const data = await response.json();

                const loadedChit = [];

                for (const key in data) {
                    loadedChit.push({
                        id: key,
                        amount: data[key].amount,
                        chitNumber: data[key].chitNumber,
                        chitType: data[key].chitType,
                        days: data[key].days,
                        members: data[key].members,
                        totalMembers: data[key].totalMembers,
                        startDate: data[key].startDate,
                    });
                }

                //----------------- DEMO CLOSE ------------------//
            setChit(loadedChit);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    let content;

    if (chits.length > 0) {
        content = <ChitList chits={chits} />;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }    

    return (
        <Fragment>
            <div>
                <h1 style={{textAlign : 'center'}}>Assigned Chits</h1>
                <button onClick={showDetails}>Details</button>
                {content}
            </div>
        </Fragment>

    )
}
export default Chitties;