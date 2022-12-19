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
      const response = await fetch('http://localhost:8080/api/getchitties/2'
        // 'http://localhost:8080/api/getchitties'+userid
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
        fetchChitDetails(loadedJoinedChits)
      );
    };

    fetchJoinedChits();
  }, []);

  // console.log(joinedChits[1]);
  // console.log(joinedChits[1]);
  // useEffect(() => {
  const fetchChitDetails = (joinedChits) => {

    // console.log(joinedChits[1]);
    axios.get('http://localhost:8080/api/chitty/').then((response) => {
      // setChits(response.data._embedded.chitty);
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
        setChits(chitDetails);
        // console.log(newItemList[key])
      }

    });
    // console.log(joinedChits[0]);
    // const response = await fetch(
    //   'http://localhost:8080/api/chitty'
    // );

    // if (!response.ok) {
    //   throw new Error('Something went wrong!');
    // }
    // const responseData = await response.json();
    // const loadedChits = [];
    // const newItemList = [...responseData.embedded.chitty]
    // for (const key in newItemList) {
    //   console.log("joinedChits[1]");
    //   if (joinedChits[key] == newItemList[key].chitNumber) {
    //     loadedChits.push({
    //       id: key,
    //       chitNumber: newItemList[key].chitNumber,
    //       startDate: newItemList[key].startDate,
    //       duration: newItemList[key].duration,
    //       numberOfChittals: newItemList[key].numberOfChittal,
    //     });
    //   }
    // }
    // setChits(loadedChits);
    // console.log(response.data);
  };

  // fetchChitDetails();
  // }, []);

  return (
    <React.Fragment>
      <Navbar />
      <h3>Joined Chits</h3>
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
    </React.Fragment>
    // <React.Fragment>
    //   <Navbar />
    //   <div className={classes.container}>
    //     <h3>Joined Chits</h3>
    //     <table className={classes.chitTable}>
    //       <tr className={classes.chitTableHead}>
    //         <th>Chit Number</th>
    //         <th>Start date</th>
    //         <th>Duration in Months</th>
    //         <th>Number of chittals</th>
    //       </tr>
    //       <tbody className={classes.tableBody}>
    //           {chits.map(chit=> {
    //             return(
    //               <tr>
    //                 <td>{chit.chitNumber}</td>
    //               </tr>
    //             )
    //           }
    //           )}
    //       </tbody>
    //     </table>
    //   </div>
    // </React.Fragment>
  )
}

export default JoinedChits;