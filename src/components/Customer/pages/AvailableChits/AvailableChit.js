import React, { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Navbar from '../../Navbar';
import classes from './AvailableChit.module.css'
import {BrowserRouter as Router,Switch, Route, Redirect } from "react-router-dom"
import ChittyForm from '../../ChittyForm/ChittyForm';

const AvailableChit =()=>{

  const [chits, setChits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const history=useHistory();

  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;

  useEffect(() => {
    const fetchChits = async () => {
      const response = await fetch(
        'http://localhost:8080/chitty',{
          headers:{
            'Authorization':token
            
          }}
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
        <h4>Available Chits</h4> 
        <table className={classes.chitTable}>
            <tr className={classes.chitTableHead}>
              <th>Chit Number</th>
              <th>Monthly Installment</th>
              <th>Duration in Months</th>
              <th>Join Chit</th>
            </tr>
          <tbody className={classes.tableBody}>
              {chits.map(chit=> {
                return(
                  <tr>
                    <td>{chit.chitNumber}</td>
                    <td>{chit.installment}</td>
                    <td>{chit.duration}</td>
                    <td>
                    <NavLink to={{pathname:'/customer/chittyform',state:{id:chit.chitNumber}}}><button className={classes.joinButton}>Join</button></NavLink>
                      </td>
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

export default AvailableChit;