import { Fragment } from "react";
import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar'
import DataTable from 'react-data-table-component';
import StartChit from "../StartedChits/StartedChits";

const AssignedChits = () => {

    const [chits, setChits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [searchName, setSearchName] = useState("");

    const columns = [
        {
            name: 'Chit Number',
            selector: 'chitNumber',
            sortable: true,
        },
        {
            name: 'View Details',
            cell: () => <button props style={{ borderRadius: '10px' }} onClick={startedChit}>Details</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            // button: true,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
        },
        {
            name: 'Start Chit',
            cell: () => <button style={{ borderRadius: '10px' }} >Start</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            // button: true,
        },
    ];

    useEffect(() => {
        const fetchAssignedChits = async () => {
            const response = await fetch(
                'http://localhost:8080/api/managers/1002/chits'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedChitties = [];
            const newItemList = [...responseData._embedded.chitty]

            for (const key in newItemList) {
                loadedChitties.push({
                    id: key,
                    chitNumber: newItemList[key].chitNumber,
                    installment: newItemList[key].installment,
                    duration: newItemList[key].duration,
                    numberOfChittal: newItemList[key].numberOfChittal,
                    currentNumberOfChittal: newItemList[key].currentNumberOfChittal,
                    totalAmount: newItemList[key].totalAmount,
                    launchDate: newItemList[key].launchDate,
                    status: 'Not Ready to launch',
                });
            }
            setChits(loadedChitties);
            setIsLoading(false);
        };

        fetchAssignedChits().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, [searchName]);

    const conditionalRowStyles = [
        {
            when: row => row,
            style: row => ({
                color: row.status.includes('Not') ? 'red' : 'green',
            }),
        },
    ];
    let content;

    if (chits.length > 0) {
        content = <StartChit chits={chits}></StartChit>
    }

    const startedChit = () => {
        console.log({content})
    }
    return (
        <Fragment>
            <Navbar />
            <DataTable
                scrollY
                maxHeight="200px"
                title="Assigned Chits"
                columns={columns}
                data={chits}
                paginationTotalRows={5}
                paginationRowsPerPageOptions={[2, 5, 8, 12, 15, 20, 50]}
                pagination
                expandableRows
                highlightOnHover
                conditionalRowStyles={conditionalRowStyles}
            />
        </Fragment>
    )
}
export default AssignedChits;