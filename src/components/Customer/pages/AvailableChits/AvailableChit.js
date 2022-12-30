import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../../Navbar';
import classes from './AvailableChit.module.css'

//Displays all the chits that are launched and able to join
const AvailableChit = () => {

  const [chits, setChits] = useState([]);

  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;

  useEffect(() => {
    const fetchChits = async () => {
      const response = await fetch(
        'http://localhost:8080/chitty',{
          headers:{
            'Authorization':token
          }}
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedChits = [];
      const newItemList = [...responseData._embedded.chitty]


      for (const key in newItemList) {
        if (newItemList[key].status != "started" && (newItemList[key].currentNumberOfChittal < newItemList[key].numberOfChittal)) {
          loadedChits.push({
            id: key,
            chitNumber: newItemList[key].chitNumber,
            installment: newItemList[key].installment,
            duration: newItemList[key].duration,
          });
        }
      }
      setChits(loadedChits);
    };
    fetchChits();

  }, []);


  return (
    <React.Fragment>
      <Navbar />
      <div className={classes.container1}>
        <h4>Available Chits</h4>
        <table className={classes.chitTable}>
          <tr className={classes.chitTableHead}>
            <th>Chit Number</th>
            <th>Monthly Installment</th>
            <th>Duration in Months</th>
            <th>Join Chit</th>
          </tr>
          <tbody className={classes.tableBody}>
            {chits.map(chit => {
              const SubmitHandler=()=>{
                console.log("chitty"+chit.chitNumber)
                sessionStorage.setItem('chittyId', JSON.stringify(chit.chitNumber));
              }
              return (
                <tr>
                  <td>{chit.chitNumber}</td>
                  <td>{chit.installment}</td>
                  <td>{chit.duration}</td>
                  <td>
                    <NavLink to={{ pathname: '/customer/chittyform',
                     state: { id1: chit.chitNumber }
                    }}><button className={classes.joinButton} 
                    onClick={SubmitHandler}
                    >Join</button></NavLink>
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