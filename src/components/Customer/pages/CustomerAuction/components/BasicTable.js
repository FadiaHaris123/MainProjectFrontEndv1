import { useEffect, useState } from 'react';
import classes from './BasicTable.module.css';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';


const BasicTable = () => {

  let userid = JSON.parse(sessionStorage.getItem('userId'));
  const [chits, setChits] = useState([]);
  const [amount, setChitAmount] = useState(null);
  const [chittyId, setChittyId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [auctionChit, setAuctionChit] = useState(false);
  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
  console.log("user",userid)
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
      cell: ({ id }) => (<button value={id} className={classes.enterAuctionRoomBtn}
        onClick={(e) => submit(e.target.value)}>Enter</button>
      ),
      sortable: true,
    },

  ];

  const onSearchHandler = (name) => {
    setSearchName(name);
  }


  useEffect(() => {
    const fetchJoinedChits = async () => {
      const response = await fetch(
        `http://localhost:8080/getchitties/${userid}`,
        {
          headers:{
            'Authorization':token
            
          }}
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
    axios.get(`http://localhost:8080/chitty`,
    {
      headers:{
        'Authorization':token
        
      }}).then((response) => {

      const newItemList = [...response.data._embedded.chitty]
      const chitDetails = [];
      let keyId = 0;
      for (const key2 in loadedJoinedChits) {
        for (const key in newItemList) {
          if (loadedJoinedChits[key2].chitNumber == newItemList[key].chitNumber) {
            if (newItemList[key].status == "started") {
              chitDetails.push({
                id: keyId,
                chitNumber: newItemList[key].chitNumber,
                installment: newItemList[key].installment,
                totalAmount: newItemList[key].totalAmount,
                auctionType: 'Online'
              });
              keyId++
            }
          }
        }
      }
      setChits(chitDetails);
    });
  };

  function submit(key) {
    setChittyId(chits[key].chitNumber);
    setChitAmount(chits[key].totalAmount);
    setAuctionChit(true);
  }

  return (
    <section className={classes.tablecontainer}>
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
      {auctionChit &&
        <Redirect to={{
          pathname: '/customer/auction/auctionroom',
          state: { userId: userid, chittyId: chittyId, amount: amount }
        }} />
      }
    </section>
  )

}

export default BasicTable;