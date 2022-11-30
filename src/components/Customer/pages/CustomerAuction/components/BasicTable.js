import { TableContainer,TableHead,Table,TableBody,TableRow,TableCell,Paper} from "@mui/material";
import { useEffect, useState } from 'react';
import classes from './BasicTable.module.css'
import Search from "./Search";

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

return(
    <section className={classes.tablecontainer}>
        <Search search={onSearchHandler}/>
        <div className={classes.autionTable}>
        <TableContainer className={classes.table} component={Paper}>
        <Table className={classes.css_rqglhn_MuiTable_root}>
            <TableHead>
                <TableRow className={classes.tablehead}>
                    <TableCell align='center'>Chit No.</TableCell>
                    <TableCell align='center'>Eligible Chittals</TableCell>
                    <TableCell align='center'>Installment No.</TableCell>
                    <TableCell align='center'>Auction Type</TableCell>
                    <TableCell align='center'>Auction Room</TableCell>
                </TableRow>
            </TableHead>
            <TableBody className={classes.tablebody}>
                    <TableRow>
                        <TableCell align='center'>01/2021</TableCell>
                        <TableCell align='center'>abc</TableCell>
                        <TableCell align='center'>2</TableCell>
                        <TableCell align='center'>online</TableCell>
                        <TableCell align='center'><button>Enter</button></TableCell>
                    </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
        </div>
    </section>
)

}

export default BasicTable;