import { Fragment } from "react";
import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar'
import DataTable from 'react-data-table-component';
import StartChit from "../StartedChits/StartedChits";
import classes from "./AssignedChits.css";
import Axios from 'axios';

const AssignedChits = () => {

    const url = "http://localhost:8080/api/chitty/update"

   
    function submit(e){
        e.preventDefault();
        Axios.post(url,{
        chitNumber:parseInt(chits.chitNumber),
        installment:parseInt(chits.installment),
        duration:parseInt(chits.duration),
        manager:parseInt(1001),
        numberOfChittal:parseInt(chits.duration),
        currentNumberOfChittal:parseInt(chits.currentNumberOfChittal),
        category:parseInt(chittyCategoryId),
        totalAmount:parseInt(chits.totalAmount),
        launchDate:chits.launchDate,
        startDate:formattedstartDate,
        status:"started"
        })
        .then(res=>{
          if(res.data != null){
          alert("Chitty started successfully")
          }
          console.log(res.data)
        })
        }
     
    
      function pad2(n) {
        return (n < 10 ? '0' : '') + n;
      }
      
      var startDate = new Date();
      var month = pad2(startDate.getMonth()+1);//months (0-11)
      var day = pad2(startDate.getDate());//day (1-31)
      var year= startDate.getFullYear();
    
      var formattedstartDate=  year+"-"+month+"-"+day;
      

    const [chittyCategoryId,setChittyCategoryId] = useState();
    const [chits, setChits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    // const [searchName, setSearchName] = useState("");

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
            cell: () => <button style={{ borderRadius: '10px' }} onClick={submit}>Start</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            // button: true,
        },
    ];

    useEffect(() => {
        const fetchAssignedChits = async () => {
            const response = await fetch(
                'http://localhost:8080/api/chitty/'+chits.chitNumber+'/category'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const chitCategory = [];
            const newItemList = [...responseData]

            for (const key in newItemList) {
                chitCategory.push({
                    id: key,
                    chitCategoryId:newItemList[key].id
                });
            }
            setChittyCategoryId(chitCategory.chitCategoryId);
            setIsLoading(false);
        };

        fetchAssignedChits().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);
    

    useEffect(() => {
        const fetchAssignedChits = async () => {
            const response = await fetch(
                'http://localhost:8080/api/managers/1001/chits'
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
                    status: newItemList[key].status,
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
            <div className={classes.assignedchitlist}>
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
            </div>
        </Fragment>
    )
}
export default AssignedChits;