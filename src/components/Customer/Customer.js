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
      
        {/* <div className={classes.about}>
          <h1>About us</h1>
          <br></br>
          <p>A  unique  financial  savings  scheme, designed to ensure safe savings of your hard earned money. A chitty scheme with insurance coverage and pension plan, software that allows you to join chits, pay installments, and
            take part in chitty auction from anywhere, anytime. Chitty  duration  50  months and below   is 12.00% (simple) and for  defaulted accounts  14.25%.

            Chitty duration above 50 months is 11.50% (simple) and for defaulted accounts 13.75%.</p>

        </div>


        <div className={classes.products}>
          <h1>Products and services</h1>
          <br></br>
          <p>A unique financial savings scheme, designed to ensure safe savings of your hard earned money. A chitty scheme with insurance coverage and pension plan, software that allows you to join chits, pay installments, and
            take part in chitty auction from anywhere, anytime.</p>

        </div>

        <div className={classes.services}>
          <h1>Customer services</h1>
          <br></br>
          <p>A unique financial savings scheme, designed to ensure safe savings of your hard earned money. A chitty scheme with insurance coverage and pension plan, software that allows you to join chits, pay installments, and
            take part in chitty auction from anywhere, anytime.</p>

        </div>

      </div> */}
     
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
