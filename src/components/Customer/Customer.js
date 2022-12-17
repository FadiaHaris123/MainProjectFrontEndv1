import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route,useHistory } from 'react-router-dom';
import './Customer.css'
import axios from 'axios';

function Customer() {
  // const history = useHistory();
  // let token = JSON.parse(sessionStorage.getItem('jwt'));
 
  // if (token == null) {
  //   history.push("/");
  // }
  // const api = `http://localhost:8080/customer`
  // axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })
  
  return (
    <div>
      <Navbar />
      <div className="heading">
        <h3>Start a new beginning with Eminence Chitty!</h3>
      </div>
      <div className='bgimg'>

      </div>

      <footer class="footer">

        <ul class="menu">
          <li class="menu__item"><a class="menu__link" href="#">Home</a></li>
          <li class="menu__item"><a class="menu__link" href="#">About</a></li>
          <li class="menu__item"><a class="menu__link" href="#">Services</a></li>
          <li class="menu__item"><a class="menu__link" href="#">Team</a></li>
          <li class="menu__item"><a class="menu__link" href="#">Contact</a></li>
        </ul>
        {/* <p>&copy;2000 Eminence Chitty | All Rights Reserved</p> */}
      </footer>

    </div>
  );
}

export default Customer;
