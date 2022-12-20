import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import classes from './JoinedChits.module.css'
import DataTable from 'react-data-table-component';

const JoinedChits = () => {
  const userid = window.localStorage.getItem('userId');
  const [chits, setChits] = useState([]);

  const columns = ([
    {
      button:'true'
    },
    {
      name: 'Chit Number',
      selector: 'chitNumber',
      sortable: true,
    },
    {
      name: 'Start date',
      selector: 'startDate',
      sortable: true,
    },
    {
      name: 'Duration in Months',
      selector: 'duration',
      sortable: true,
    },
  ]);

  useEffect(() => {
    const fetchJoinedChits = async () => {
      const response = await fetch(
        // 'http://localhost:8080/api/getchitties/2'
        `http://localhost:8080/api/getchitties/${userid}`
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      console.log(responseData)
      const loadedJoinedChits = [];
      for (const key in responseData) {
        loadedJoinedChits.push({
          chitNumber: responseData[key],
        });
      }
      return (
        fetchChitDetails(loadedJoinedChits)
      );
    };
    fetchJoinedChits();
  }, []);

  const fetchChitDetails = (loadedJoinedChits) => {
    axios.get('http://localhost:8080/api/chitty/').then((response) => {
      const newItemList = [...response.data._embedded.chitty]
      const chitDetails = [];
      for (const key2 in loadedJoinedChits) {
        for (const key in newItemList) {
          if (loadedJoinedChits[key2].chitNumber == newItemList[key].chitNumber) {
            chitDetails.push({
              chitNumber: newItemList[key].chitNumber,
              startDate: newItemList[key].startDate,
              duration: newItemList[key].duration,
            })
          }
        }
        chitDetails.map((chits)=>{
          if(chits.startDate==null){
            chits.startDate = "Not Started"
          }
        })
      }
      setChits(chitDetails);
    });
  };


  return (
    <React.Fragment>
      <Navbar />
      <div className={classes.joinedChitsTable}>
      <h3 className={classes.heading}>Joined Chits</h3>
      <DataTable
        scrollY
        maxHeight="200px"
        title=""
        columns={columns}
        data={chits}
        paginationTotalRows={5}
        paginationRowsPerPageOptions={[1, 5, 10, 15, 20, 50]}
        pagination
        highlightOnHover
      />
      </div>
    </React.Fragment>
  )
}

export default JoinedChits;
