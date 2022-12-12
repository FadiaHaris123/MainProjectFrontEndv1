import "bootstrap/dist/css/bootstrap.min.css" 
import "./App.css"
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router,Switch, Route, Redirect } from "react-router-dom"
import Auth from "./UI/Auth"
import ForgotPassword from "./UI/ForgetPassword/ForgetPassword"
import CreateNewPassword from "./UI/ForgetPassword/ResetPassword"
import registrationForm from "./UI/registrationForm"
import foreman from "./components/foreman/foreman"
import Manager from "./components/foreman/Manager/MainManagerPage"
import ManagerPage from "./components/Manager/ManagerPage"
import AssignedChits from "./components/Manager/pages/AssignedChits/AssignedChits"
import StartChit from "./components/Manager/pages/StartedChits/StartedChits"
import ChangePassword from "./components/Manager/pages/ChangePassword/ChangePassword"
import Customer from "./components/Customer/Customer"
import LandingPage from "./components/LandingPage/LandingPage"
import ChittyForm from './components/ChittyForm/ChittyForm'
import ChittyManagers from "./components/foreman/ManagerDetails/ChittyManagers"
import Earnings from "./components/Earnings/Earnings"
import Auction from './components/Customer/pages/CustomerAuction/Auction'
import Profile from './components/Customer/pages/CustomerProfile/Profile'
import AvailableChits from './components/Customer/pages/AvailableChits/AvailableChit'
import { GrLaunch } from "react-icons/gr";
import RazorPay from "./components/Customer/RazorPay/payment"
import MainManagerPage from "./components/foreman/Manager/MainManagerPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInformation === '1'){
      setIsLoggedIn(true);
    }
  },[]);


  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
     
     localStorage.setItem('isLoggedIn','1');
     setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/login" component={Auth} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/createnewpassword" component={CreateNewPassword} />
          <Route path="/register" component={registrationForm}/>
          <Route path="/admin" component={foreman} />
          <Route exact path="/manager" component={ManagerPage}/>
          <Route path="/manager/assignedchits" component={AssignedChits}/>
          <Route path="/manager/changepassword" component={ChangePassword}/>
          <Route path="/manager/startchit" component={StartChit}/>
          <Route exact path="/employee" component={MainManagerPage}/>
          <Route path="/employee/managerslist" component={ChittyManagers}/>
          <Route exact path="/customer" component={Customer}/>
          <Route path='/customer/auction' component={Auction} />
          <Route path='/customer/profile' component={Profile} />
          <Route path='/customer/availablechits' component={AvailableChits}/>
          <Route path='/customer/payment' component={RazorPay}/>
        </Switch>
      </Router>
  )
}

export default App