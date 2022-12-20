import React, { useState, useEffect } from 'react';
import axios from "axios";
import classes from "./Header.module.css"
import { RiCoinsLine } from 'react-icons/ri';

const Header = () =>{
    let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
    let userid = JSON.parse(sessionStorage.getItem('userId'));
    // const userid = window.localStorage.getItem('userId');
    const [userName, setUserName] = useState([]);

    useEffect(() => {
        const fetchManagers = async () => {
          const response = await axios.get(
            `http://localhost:8080/user-details/${userid}`,
            {
              headers:{
                'Authorization':token
                
              }}
          );
          setUserName(response.data.firstName)
          console.log(response.data.firstName)
        };
        fetchManagers();
      }, []);
    
return(
    <React.Fragment>
        <div className={classes.headerContainer}>
            <h2>Hi {userName},</h2>
            <h4>  Welcome to the Auction Room</h4>
        </div>
    </React.Fragment>
)
}

export default Header;