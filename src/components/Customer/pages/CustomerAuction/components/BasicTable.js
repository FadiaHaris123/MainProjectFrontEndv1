import { useEffect, useState } from 'react';
import classes from './BasicTable.module.css';
import { Link } from 'react-router-dom';
import Search from "./Search";
import axios from 'axios';
import DataTable from 'react-data-table-component';


const BasicTable = () => {
  
  const userid = window.localStorage.getItem('userId');
  const [chits, setChits] = useState([]);
  const [searchName, setSearchName] = useState("");

  const columns = [
    {
      name: 'Chit Number',
      selector: 'chitNumber',
      sortable: true,
    },
    {
      name: 'Total Installments',
      selector: 'installment',
      sortable: true,
    },
    {
      name: 'Auction Type',
      selector: 'auctionType',
      sortable: true,
    },
    {
      name: 'Auction Room',
      cell: () => <Link to="/customer/auction/auctionroom"><button className={classes.enterAuctionRoomBtn}>Enter</button></Link>,
      sortable: true,
    },

  ];

  const onSearchHandler = (name) => {
    setSearchName(name);
  }

// useEffect(() => {
//   const fetchManagers = async () => {
//     const response = await fetch(
//       'http://localhost:8080/managers/search/findByfirstNameContaining?name='+searchName,
//       {
//         headers:{
//           'Authorization':token
          
//         }}
//     );
  useEffect(() => {
    const fetchJoinedChits = async () => {
      const response = await fetch(
        `http://localhost:8080/api/getchitties/${userid}`
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();

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
            if (newItemList[key].status == "started") {
              chitDetails.push({
                chitNumber: newItemList[key].chitNumber,
                installment: newItemList[key].installment,
                auctionType: 'Online'
              })
            }
          }
        }
      }
      setChits(chitDetails);
    });
  };

  return (
    <section className={classes.tablecontainer}>
      <Search search={onSearchHandler} />
      <div className={classes.auctionDetailsTable}>
        <DataTable
          scrollY
          maxHeight="200px"
          title=""
          columns={columns}
          data={chits}
          paginationTotalRows={5}
          paginationRowsPerPageOptions={[2, 5, 8, 12, 15, 20, 50]}
          pagination
          expandableRows
          highlightOnHover
        />
      </div>
    </section>
  )

}

export default BasicTable;