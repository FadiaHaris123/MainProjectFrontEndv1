import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import classes from './JoinedChits.module.css'
import DataTable from 'react-data-table-component';
import Axios from 'axios';

const JoinedChits = () => {
  let userid = JSON.parse(sessionStorage.getItem('userId'));
  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;

  // const userid = window.localStorage.getItem('userId');
  const [joinedChits, setJoinedChits] = useState([]);
  const [chits, setChits] = useState([]);

  const columns = ([
    {
      button: 'true'
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
      const response = await fetch(`http://localhost:8080/getchitties/${userid}`,

        {
          headers: {
            'Authorization': token

          }
        }
        // 'http://localhost:8080/api/getchitties'+userid
      );
      console.log("check", response);
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

  // console.log(joinedChits[1]);
  // console.log(joinedChits[1]);
  // useEffect(() => {
  const fetchChitDetails = (loadedJoinedChits) => {

    // console.log(joinedChits[1]);
    Axios.get(`http://localhost:8080/chitty/`,
      {
        headers: {
          'Authorization': token

        }
      }).then((response) => {
        // setChits(response.data._embedded.chitty);
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
          chitDetails.map((chits) => {
            if (chits.startDate == null) {
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
