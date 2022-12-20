import { TableContainer,TableHead,Table,TableBody,TableRow,TableCell,Paper} from "@mui/material";
import { useEffect, useState } from 'react';
import classes from './BasicTable.module.css';
import { Link } from 'react-router-dom';
import Search from "./Search";
import DataTable from 'react-data-table-component';


const BasicTable = () => {
  const userid = window.localStorage.getItem('userId');
  const [joinedChits, setJoinedChits] = useState([]);
  const [chits, setChits] = useState([]);

const columns = ([
  {
    name: 'Chit Number',
    selector:'chitNumber',
    sortable: true,
  },
  {
    name: 'Total Amount',
    selector:' ',
    sortable: true,
  },
  {
    name: 'Start date',
    selector: 'startDate',
    sortable: true,
  },
  {
    name: 'Auction Room',
    cell: () => <Link to="/customer/auction/auctionroom"><button className={classes.enterAuctionRoomBtn}>Enter</button></Link>,
    sortable: true,
  },
 
]);

useEffect(() => {
  const fetchChits = async () => {
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
    setJoinedChits(loadedJoinedChits);
    return (
      fetchChits(joinedChits)
    );
  };

  fetchChits();
}, []);



return(
    <section className={classes.tablecontainer}>
        {/* <Search search={onSearchHandler}/> */}
        <div className={classes.auctionDetailsTable}>
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
    </section>
)

}

export default BasicTable;