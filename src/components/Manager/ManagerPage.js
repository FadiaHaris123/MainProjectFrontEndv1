import { Fragment } from "react";
import React, { useState, useCallback } from 'react';
import Header from "./Header";
import ManagerNav from "./ManagerNav";
import "./ManagerPage.css";
import ChitList from './ChitList';

const ManagerPage = () => {
    const [chits, setChit] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const assignchits = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                'http://localhost:8080/api/chittyaccountdetails'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            const loadedChit = [];
            const newItemList = [...data._embedded.chittyaccountdetails]

            for (const key in newItemList) {
                loadedChit.push({
                    id: key,
                    amount: newItemList[key].amount,
                    chitNumber: newItemList[key].chitNumber,
                    chitType: newItemList[key].chitType,
                    days: newItemList[key].days,
                    members: newItemList[key].members,
                    startDate: newItemList[key].startDate,
                });
            }
            //----------------- FOR DEMO -----------------//
            
                // const response = await fetch('https://assignchits-default-rtdb.firebaseio.com/assignedchits.json');
                // if (!response.ok) {
                //     throw new Error('Something went wrong!');
                // }

                // const data = await response.json();

                // const loadedChit = [];

                // for (const key in data) {
                //     loadedChit.push({
                //         id: key,
                //         amount: data[key].amount,
                //         chitNumber: data[key].chitNumber,
                //         chitType: data[key].chitType,
                //         days: data[key].days,
                //         members: data[key].members,
                //         startDate: data[key].startDate,
                //     });
                // }

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
            <div className="header_nav">
                <Header></Header>
                <ManagerNav></ManagerNav>
            </div>
            <div className="manager-div-groups">
                <section className="manager-section-groups">
                    <button className="manager-button-groups" onClick={assignchits}>Assigned Chits</button>
                    {content}
                </section>
                <section className="manager-section-groups">
                    <button className="manager-button-groups">Add Customers</button>
                </section>
            </div>
        </Fragment>)
}
export default ManagerPage;