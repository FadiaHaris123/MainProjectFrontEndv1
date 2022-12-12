import { useHistory } from "react-router-dom"
import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../Navbar'
import DataTable from 'react-data-table-component';
import StartChit from "../StartedChits/StartedChits";

const AssignedChits = () => {

    const [chits, setChits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [isReady, setisReady] = useState(false);
    const history = useHistory();
    console.log(chits);
    const columns = [
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
        {
            name: 'Start Chit',
            selector: 'start',
            cell: () => <button disabled={!isReady} style={{ borderRadius: '10px', backgroundColor: '#103c61', color: '#fff' }} onClick={startChit}>Start</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            // button: true,
        },
    ];

    const startChit = () => {
        history.push("/manager/startchit");
    }
    useEffect(() => {
        const fetchAssignedChits = async () => {
            const response = await fetch(
                'http://localhost:8080/api/managers/1002/chits'
                // 'http://localhost:8080/api/managers/' + id + '/chits'
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
                    status: (newItemList[key].currentNumberOfChittal < newItemList[key].numberOfChittal) ? 'Not Ready to start' : 'Ready to start',
                    // start: setisReady(newItemList[key].currentNumberOfChittal === newItemList[key].numberOfChittal),
                });
            }
            setChits(loadedChitties);
            setIsLoading(false);
        };

        fetchAssignedChits().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    const conditionalRowStyles = [
        {
            when: row => row,
            style: row => ({
                color: row.status.includes('Not') ? 'red' : 'green',
            }),
        },
    ];

    const ExpandedComponent = ({ data }) => <pre>
        Installment : ₹{JSON.stringify(data.installment)} <br />
        Duration : {JSON.stringify(data.duration)} days<br />
        Current Chittals : <span  style={{color: data.status.includes('Not') ? 'red' : ''}}>
            {JSON.stringify(data.currentNumberOfChittal)} </span> <br/>
        Total Chittals : {JSON.stringify(data.numberOfChittal)} <br />
        Launch Date : {JSON.stringify(Date(data.launchDate))} <br /> <br />
        <button style={{ borderRadius: '10px', backgroundColor: '#103c61', color: '#fff' }}>Requested Chittals</button>
    </pre>;

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
                paginationRowsPerPageOptions={[1, 5, 10, 15, 20, 50]}
                pagination
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                expandOnRowClicked
                highlightOnHover
                conditionalRowStyles={conditionalRowStyles}
            />
        </Fragment>
    )
}
export default AssignedChits;