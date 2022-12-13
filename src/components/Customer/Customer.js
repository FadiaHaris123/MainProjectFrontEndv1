import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './Customer.css'

function Customer() {
  return (
    <div>
      <Navbar />
      <div className='bgimg'>
        <div className='imge'> 
            </div>
     </div>
    <footer class="footer">
  
    <ul class="menu">
      <li class="menu__item"><a class="menu__link" href="#">Home</a></li>
      <li class="menu__item"><a class="menu__link" href="#">About</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Services</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Team</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Contact</a></li>

    </ul>
    {/* <p>&copy;2021 Eminence Chitty | All Rights Reserved</p> */}
  </footer>
  
    </div>
  );
}

export default Customer;
