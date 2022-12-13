import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../Navbar'
import Axios from 'axios'
import DataTable from 'react-data-table-component';

const AssignedChits = () => {

    const [chits, setChits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    
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
        {
            name: 'Start Chit',
            selector: 'start',
            cell: ({ id, status }) => (<button value={id}
                disabled={status.includes('Not') ? true : false}
                style={{ borderRadius: '10px', backgroundColor: '#103c61', color: '#fff' }}
                onClick={(e) => submit(e.target.value)}>Start</button>),
            ignoreRowClick: true,
            allowOverflow: true,
            // button: true,
        },
    ]);

    const url = "http://localhost:8080/api/chitty/update"

    function submit(value) {
        const key = value;
        Axios.put(url, {
            chitNumber: chits[key].chitNumber,
            installment: chits[key].installment,
            duration: chits[key].duration,
            manager: 1002,
            numberOfChittal: chits[key].numberOfChittal,
            currentNumberOfChittal: chits[key].currentNumberOfChittal,
            category: 1,
            totalAmount: chits[key].totalAmount,
            launchDate: chits[key].launchDate,
            startDate: formattedstartDate,
            status: "started"
        })
            .then(res => {
                if (res.data != null) {
                    alert("Chitty started successfully")
                }
                console.log(res.data)
            })
    }
    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }
    var startDate = new Date();
    var month = pad2(startDate.getMonth() + 1);//months (0-11)
    var day = pad2(startDate.getDate());//day (1-31)
    var year = startDate.getFullYear();
    var formattedstartDate = year + "-" + month + "-" + day;

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
    function limit(string = '', limit = 0) {
        return string.substring(0, limit)
    }
    const ExpandedComponent = ({ data }) => <pre>
        Installment : ₹{JSON.stringify(data.installment)} <br />
        Duration : {JSON.stringify(data.duration)} days<br />
        Current Chittals : <span style={{ color: data.status.includes('Not') ? 'red' : '' }}>
            {JSON.stringify(data.currentNumberOfChittal)} </span> <br />
        Total Chittals : {JSON.stringify(data.numberOfChittal)} <br />
        Launch Date : {(limit(data.launchDate, 10))} <br /> <br />
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