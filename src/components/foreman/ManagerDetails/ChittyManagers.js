import { TableContainer,TableHead,Table,TableBody,TableRow,TableCell,Paper} from "@mui/material";
import { useEffect, useState } from 'react';
import classes from './ChittyManagers.module.css'
import Search from "./Search";

const ChittyManagers = () => {

const [managers, setManager] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [httpError, setHttpError] = useState();
const [searchName, setSearchName] = useState("");


const onSearchHandler = (name)=>{
    console.log(name)
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
        <TableContainer className={classes.table} component={Paper} sx={{maxHeight:'200px'}}>
        <Table className={classes.css_rqglhn_MuiTable_root} aria-label="simple table" stickyHeader>
            <TableHead>
                <TableRow className={classes.tablehead}>
                    <TableCell align='center'>FirstName</TableCell>
                    <TableCell align='center'>LastName</TableCell>
                    <TableCell align='center'>email</TableCell>
                </TableRow>
            </TableHead>
            <TableBody className={classes.tablebody}>
                {managers.map(row=>(
                    <TableRow sx={{'&:last-child td,&:last-child th':{border:0}}}>
                        <TableCell align='center'>{row.firstName}</TableCell>
                        <TableCell align='center'>{row.lastName}</TableCell>
                        <TableCell align='center'>{row.email}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </section>
)

}

export default ChittyManagers;