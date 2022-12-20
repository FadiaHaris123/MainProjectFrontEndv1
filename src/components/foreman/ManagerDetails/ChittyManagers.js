import { useEffect, useState } from 'react';
import classes from './ChittyManagers.module.css'
import Search from "./Search";
import DataTable from 'react-data-table-component';

const ChittyManagers = () => {

const [managers, setManager] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [httpError, setHttpError] = useState();
const [searchName, setSearchName] = useState("");
let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;

const columns = [
  {
    name: 'First Name',
    selector: 'firstName',
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: 'lastName',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
  },
];


const onSearchHandler = (name)=>{
    console.log(name)
    setSearchName(name);
  }

useEffect(() => {
  const fetchManagers = async () => {
    const response = await fetch(
      'http://localhost:8080/managers/search/findByfirstNameContaining?name='+searchName,{
        headers:{
          'Authorization':token
          
        }}
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
     <DataTable
        scrollY
        maxHeight="200px"
        title="Managers"
        columns={columns}
        data={managers}
        paginationTotalRows={5}
        paginationRowsPerPageOptions={[2,5,8,12,15,20,50]}
        pagination
        expandableRows 
        highlightOnHover
      />
    </section>
)

}

export default ChittyManagers;