import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import classes from './JoinedChits.module.css'
import DataTable from 'react-data-table-component';

const JoinedChits = () => {
  const userid = window.localStorage.getItem('userId');
  const [joinedChits, setJoinedChits] = useState([]);
  const [chits, setChits] = useState([]);

  const columns = ([
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
        'http://localhost:8080/api/getchitties/2'
        // `http://localhost:8080/api/getchitties/${userid}`
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();

      const loadedJoinedChits = [];
      for (const key in responseData) {
        loadedJoinedChits.push({
          // id: key,
          chitNumber: responseData[key],
        });
      }
      setJoinedChits(loadedJoinedChits);
      return (
        fetchChitDetails(joinedChits)
      );
    };

    fetchJoinedChits();
  }, []);

  const fetchChitDetails = (joinedChits) => {
    axios.get('http://localhost:8080/api/chitty/').then((response) => {

      const newItemList = [...response.data._embedded.chitty]
      const chitDetails = [];
      for (const key in newItemList) {
        if (joinedChits[key].chitNumber == newItemList[key].chitNumber) {
          chitDetails.push({
            chitNumber: newItemList[key].chitNumber,
            startDate: newItemList[key].startDate,
            duration: newItemList[key].duration,
          })
          console.log(joinedChits[key])
        }
        chitDetails.map((chits) => {
          if (chits.startDate == null) {
            chits.startDate = "Not Started"
          }
        })
        setChits(chitDetails);
      }

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
