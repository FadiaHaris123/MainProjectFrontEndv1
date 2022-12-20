import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../Navbar'
import { useHistory } from "react-router-dom"
import Axios from 'axios'
import DataTable from 'react-data-table-component';
import classes from './AssignedChits.module.css'

const AssignedChits = () => {

    const [chits, setChits] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [chitNumber, setChitNumber] = useState([]);
    // const id = window.localStorage.getItem('managerId');
    let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
    let id = JSON.parse(sessionStorage.getItem('userId'));

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
            cell: ({ id, status, started }) => (<button className={classes.assignedbtn} value={id}
                disabled={status.includes('Not') || started.includes('started') ? true : false}
                style={{ borderRadius: '10px', backgroundColor: '#103c61', color: '#fff' }}
                onClick={(e) => submit(e.target.value)}>Start</button>),
            ignoreRowClick: true,
            allowOverflow: true,
        },
    ]);

    const url = "http://localhost:8080/chitty/update"
    const history = useHistory();

    useEffect(() => {
        function getCategoryId() {
            Axios.get(`http://localhost:8080/chitty/${chitNumber}/category`,{
                headers:{
                  'Authorization':token
                  
                }}).then((response) => {
                setCategoryId(response.data.id)
            });
        }
        getCategoryId();
        console.log("chitNo.",chitNumber)
    })

    function submit(value) {
        const key = value;
        setChitNumber(chits[key].chitNumber);
        console.log("chitNo.",chitNumber)
        Axios.get(`http://localhost:8080/chitty/${chitNumber}/category`,
            // 'http://localhost:8080/chitty/' + chitNumber + '/category',
        {
            headers:{
              'Authorization':token
              
            }})
            
        //     .then((response) => {
        //     // setCategoryId(response.data.id)
        // })
            .then(() => {
                Axios.put(url, {
                    chitNumber: chits[key].chitNumber,
                    installment: chits[key].installment,
                    duration: chits[key].duration,
                    manager: id,
                    numberOfChittal: chits[key].numberOfChittal,
                    currentNumberOfChittal: chits[key].currentNumberOfChittal,
                    category: categoryId,
                    totalAmount: chits[key].totalAmount,
                    launchDate: chits[key].launchDate,
                    startDate: formattedstartDate,
                    status: "started"
                },
                {
                    headers:{
                      'Authorization':token
                      
                    }})
                    .then(res => {
                        if (res.data != null) {
                            alert("Chitty started successfully")
                        }
                        console.log(res.data)
                    })
                return (history.push("/manager/startchit"));
            })
    }

    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }
    function limit(string = '', limit = 0) {
        return string.substring(0, limit)
    }
    var startDate = new Date();
    var month = pad2(startDate.getMonth() + 1);//months (0-11)
    var day = pad2(startDate.getDate());//day (1-31)
    var year = startDate.getFullYear();
    var formattedstartDate = year + "-" + month + "-" + day;

    useEffect(() => {
        const fetchAssignedChits = async () => {
            const response = await fetch(
                // 'http://localhost:8080/managers/' + id + '/chits',
                `http://localhost:8080/managers/${id}/chits`,
                {
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
                if (newItemList[key].status != "started") {
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
                            'Not Ready to start' :
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
        <button style={{ borderRadius: '10px', backgroundColor: '#103c61', color: '#fff' }}>Requested Chittals</button>
    </pre>;

    return (
        <Fragment>
            <Navbar />
            <div className={classes.assignedChits}>
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
            </div>

        </Fragment>
    )
}

export default AssignedChits;
