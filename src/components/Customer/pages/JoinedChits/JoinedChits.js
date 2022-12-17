import React, { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Navbar from '../../Navbar';
import classes from './JoinedChits.module.css'
import {BrowserRouter as Router,Switch, Route, Redirect } from "react-router-dom"
import ChittyForm from '../../ChittyForm/ChittyForm';

const JoinedChits =()=>{
  const [chits, setChits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const history=useHistory();

  useEffect(() => {
    const fetchChits = async () => {
      const response = await fetch(
        'http://localhost:8080/api/chitty'
      );

      console.log(response);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedChits = [];
      const newItemList = [...responseData._embedded.chitty]

      for (const key in newItemList) {
        if(newItemList[key].status != "started"){
          loadedChits.push({
            id: key,
            chitNumber: newItemList[key].chitNumber,
            installment: newItemList[key].installment,
            duration: newItemList[key].duration,
          });
        }
      }

      setChits(loadedChits);
      setIsLoading(false);
    };

    fetchChits().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  

  if (isLoading) {
    return (
      <section className={classes.chitsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.chitsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  // const handleClick = () => {
    
  //   // history.push("/customer/chittyform");
  //   <Link to="/customer/chittyform"/>
  // };


   return(
   <React.Fragment>
      <Navbar/>
       <div className={classes.container}>
        <h3>Joined Chits</h3> 
        <table className={classes.chitTable}>
            <tr className={classes.chitTableHead}>
              <th>Chit Number</th>
              <th>Chittal Id</th>
              <th>Monthly Installment</th>
              <th>Start date</th>
              <th>Duration in Months</th>
              <th>Number of chittals</th>
             
            </tr>
          <tbody className={classes.tableBody}>
              {chits.map(chit=> {
                return(
                  <tr>
                    <td>{chit.chitNumber}</td>
                    <td>{chit.id}</td>
                    <td>{chit.installment}</td>
                    <td>{chit.duration}</td>
                  
                  </tr>
                )
              }
              )}
          </tbody>
        </table>
       </div>
    </React.Fragment>
    )
}

export default JoinedChits;