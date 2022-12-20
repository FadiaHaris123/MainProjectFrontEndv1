import React from "react";
import classes from "./Header.module.css"
import { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () =>{
    const id = window.localStorage.getItem('managerId');
    const [managerName, setManagerName] = useState("");

    useEffect(() => {
        const fetchManagers = async () => {
          const response = await axios.get(
            `http://localhost:8080/api/managers/${id}`
          );
          setManagerName(response.data.firstName)
        };
        fetchManagers();
      }, []);
return(
    <React.Fragment>
        <div className={classes.headerContainer}>
            <h2>Hi   {managerName} ...</h2>
            <h4>  Welcome to the Auction Room</h4>
        </div>
    </React.Fragment>
)
}

export default Header;