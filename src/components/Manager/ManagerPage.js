import React, { useEffect } from 'react';
import Navbar from './Navbar';
import classes from './ManagerPage.module.css'
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
function ManagerPage() {

  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
  let id = JSON.parse(sessionStorage.getItem('userId'));
  const history = useHistory();

  useEffect(() => {
    const fetchManagers = async () => {
      const response = await fetch(
        `http://localhost:8080/managers/${id}`, {
        headers: { 'Authorization': token }
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      if (responseData.passWordStatus == "default") {
        history.push("/manager/changepassword")
      }
    };
    fetchManagers();
  }, [])

  return (
    <Fragment>
      <Navbar />
      <h3 className={classes.heading}>The best way to predict the future is to create it!</h3>
      <div className={classes.bimg}>
      </div>

    </Fragment>
  );
}

export default ManagerPage;