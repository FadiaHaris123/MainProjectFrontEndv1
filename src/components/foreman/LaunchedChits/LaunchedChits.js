import React, { Fragment, useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import { useHistory } from "react-router-dom"
import Axios from 'axios'
import classes from './LaunchedChits.module.css'
import DataTable from 'react-data-table-component';
import Header from '../Header/Header';

const LaunchedChits = () => {
    let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;

    const [chits, setChits] = useState([]);

    const columns = ([
        {
            name: 'Chit Number',
            selector: 'chitNumber',
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
        },
    ]);

    useEffect(() => {
        const fetchAssignedChits = async () => {
            const response = await fetch(
                'http://localhost:8080/chitty'
                ,{
                    headers:{
                      'Authorization':token
                      
                    }}
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            
            const responseData = await response.json();

            const loadedChitties = [];
            const newItemList = [...responseData._embedded.chitty]

            for (const key in newItemList) {
                 {
                    loadedChitties.push({
                        id: key,
                        chitNumber: newItemList[key].chitNumber,
                        installment: newItemList[key].installment,
                        duration: newItemList[key].duration,
                        numberOfChittal: newItemList[key].numberOfChittal,
                        currentNumberOfChittal: newItemList[key].currentNumberOfChittal,
                        totalAmount: newItemList[key].totalAmount,
                        launchDate: newItemList[key].launchDate,
                        started: newItemList[key].status,
                        status: ((newItemList[key].currentNumberOfChittal < newItemList[key].numberOfChittal) ?
                            'Launched' :
                            (newItemList[key].status.includes('started') ? "Chit Started" : "Ready to start")),
                    });
                }
            }
            setChits(loadedChitties);
        };
        fetchAssignedChits();
    }, []);

    const conditionalRowStyles = [
        {
            when: row => row,
            style: row => ({
                color: row.status.includes('Not') ? 'red' : 'green',
            }),
        },
    ];
    function limit(string = '', limit = 0) {
        return string.substring(0, limit)
    }
    const ExpandedComponent = ({ data }) => <pre>
        Installment : ₹{JSON.stringify(data.installment)} <br />
        Duration : {JSON.stringify(data.duration)} months<br />
        Current Chittals : <span style={{ color: data.status.includes('Not') ? 'red' : '' }}>
            {JSON.stringify(data.currentNumberOfChittal)} </span> <br />
        Total Chittals : {JSON.stringify(data.numberOfChittal)} <br />
        Launch Date : {(limit(data.launchDate, 10))} <br /> <br />
    </pre>;

    return (
        <Fragment>
            <Header/>
            <Navigation/>
            <h1 className={classes.heading}>Launched Chits</h1>
            <div className={classes.launchedChitsTable}>
            <DataTable className={classes.datatable}
                scroll
                maxHeight="200px"
                title ="Launched Chits"
                columns={columns}
                data={chits}
                paginationTotalRows={5}
                paginationRowsPerPageOptions={[1, 5, 10, 15, 20, 50]}
                pagination
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                expandOnRowClicked
                highlightOnHover
                conditionalRowStyles={conditionalRowStyles}
            />
            </div>
        </Fragment>
    )
}
export default LaunchedChits;