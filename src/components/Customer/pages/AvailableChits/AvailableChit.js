import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import classes from './AvailableChit.module.css'

const AvailableChit =()=>{

  const [chits, setChits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

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
        loadedChits.push({
          id: key,
          chitNumber: newItemList[key].chitNumber,
          installment: newItemList[key].installment,
          duration: newItemList[key].duration,
        });
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

   return(
   <React.Fragment>
      <Navbar/>
       <div className={classes.container}>
        <h4>Available Chits</h4> 
        <table>
          <thead>
            <tr>
              <th>Chit Number</th>
              <th>Monthly Installment</th>
              <th>Duration in Months</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {chits.map((chit)=>(
                <td>{chit.chitNumber}</td>
                
              ))}
              {chits.map((chit)=>(
                <td>{chit.installment}</td>
               
              ))}
              {chits.map((chit)=>(
                <td>{chit.duration}</td>
               
              ))}
            </tr>
          </tbody>
        </table>
       </div>
    </React.Fragment>
    )
}

export default AvailableChit;