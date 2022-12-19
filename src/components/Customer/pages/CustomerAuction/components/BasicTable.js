import { TableContainer,TableHead,Table,TableBody,TableRow,TableCell,Paper} from "@mui/material";
import { useEffect, useState } from 'react';
import classes from './BasicTable.module.css';
import { Link } from 'react-router-dom';
import Search from "./Search";
import DataTable from 'react-data-table-component';


const BasicTable = () => {

const [managers, setManager] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [httpError, setHttpError] = useState();
const [searchName, setSearchName] = useState("");


const onSearchHandler = (name)=>{
    setSearchName(name);
  }

useEffect(() => {
  const fetchManagers = async () => {
    const response = await fetch(
      'http://localhost:8080/api/managers/search/findByfirstNameContaining?name='+searchName
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const responseData = await response.json();

    const loadedManagers = [];
    const newItemList = [...responseData._embedded.manager]
    //manager is the classname

    for (const key in newItemList) {
      loadedManagers.push({
        id: key,
        firstName: newItemList[key].firstName,
        lastName: newItemList[key].emp_lastname,
        email: newItemList[key].email,
      });
    }

    setManager(loadedManagers);
    setIsLoading(false);
  };

  fetchManagers().catch((error) => {
    setIsLoading(false);
    setHttpError(error.message);
  });
}, [searchName]);



if (isLoading) {
  return (
    <section className={classes.managersLoading}>
      <p>Loading...</p>
    </section>
  );
}

if (httpError) {
  return (
    <section className={classes.managersError}>
      <p>{httpError}</p>
    </section>
  );
}

const data = [
  {
    'Chit Number': "1001",
    'Eligible Chittals': "25",
    'Installment No.':"2",
    'Auction Type': "Online"
  },
  {
    'Chit Number': "1002",
    'Eligible Chittals': "25",
    'Installment No.':"2",
    'Auction Type': "Online"
  },
  {
    'Chit Number': "1001",
    'Eligible Chittals': "25",
    'Installment No.':"2",
    'Auction Type': "Online"
  }
]

const columns = [
  {
    name: 'Chit Number',
    sortable: true,
  },
  {
    name: 'Total Installments',
    sortable: true,
  },
  {
    name: 'Auction Type',
    default: 'Online',
    sortable: true,
  },
  {
    name: 'Auction Room',
    cell: () => <Link to="/customer/auction/auctionroom"><button className={classes.enterAuctionRoomBtn}>Enter</button></Link>,
    sortable: true,
  },
 
];


return(
    <section className={classes.tablecontainer}>
        <Search search={onSearchHandler}/>
        <div className={classes.auctionDetailsTable}>
        <DataTable
        scrollY
        maxHeight="200px"
        title=""
        columns={columns}
        data={data}
        paginationTotalRows={5}
        paginationRowsPerPageOptions={[2,5,8,12,15,20,50]}
        pagination
        expandableRows 
        highlightOnHover
      />
        </div>
    </section>
)

}

export default BasicTable;