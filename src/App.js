import "bootstrap/dist/css/bootstrap.min.css" 
import "./App.css"
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router,Switch, Route, Redirect } from "react-router-dom"
import Auth from "./UI/Auth"
import ForgotPassword from "./UI/ForgetPassword/ForgetPassword"
import NomineeForm from "./components/Customer/ChittyForm/NomineeForm";
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
import ChittyForm from "./components/Customer/ChittyForm/ChittyForm";
import ChittyManagers from "./components/foreman/ManagerDetails/ChittyManagers"
import Earnings from "./components/Earnings/Earnings"
import Auction from './components/Customer/pages/CustomerAuction/Auction'
import Profile from './components/Customer/pages/CustomerProfile/Profile'
import AvailableChits from './components/Customer/pages/AvailableChits/AvailableChit'
import { GrLaunch } from "react-icons/gr";
import RazorPay from "./components/Customer/RazorPay/payment"
import MainManagerPage from "./components/foreman/Manager/MainManagerPage";
import AuctionRoom from "./components/AuctionRoom/AuctionRoom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManagerLoggedIn, setIsManagerLoggedIn] = useState(false);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);

  // useEffect(() => {
  //   const storedUserLoggedInformation = localStorage.getItem('isLoggedIn');

  //   if (storedUserLoggedInformation === '1'){
  //     setIsLoggedIn(true);
  //   }
  // },[]);


  const loginHandler = (isLoggedIn,roleId) => {    
    if(roleId===1){
      localStorage.setItem('isLoggedIn','1');
     setIsLoggedIn(isLoggedIn);
    }
    else if(roleId===2){
      localStorage.setItem('isLoggedIn','2');
      setIsManagerLoggedIn(isLoggedIn);
    }
    else if(roleId===3){
      localStorage.setItem('isLoggedIn','3');
      setIsCustomerLoggedIn(isLoggedIn);
    }
     
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/login">
            {!isLoggedIn ? <Auth onLogin={loginHandler} /> : <Redirect to='/admin'/>}
            {isManagerLoggedIn && <Redirect to="/manager"/>}
            {isCustomerLoggedIn && <Redirect to="/manager"/>}
          </Route>
          {/* <Route path="/login" component={Auth}/>           */}
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
          <Route exact path='/customer/auction' component={Auction} />
          <Route path='/customer/profile' component={Profile} />
          <Route path='/customer/availablechits' component={AvailableChits}/>
          <Route path='/customer/payment' component={RazorPay}/>
          <Route path='/customer/auction/auctionroom' component={AuctionRoom}/>
          <Route path='/customer/chittyform' component={ChittyForm}/>
          <Route path='/customer/nomineeform' component={NomineeForm}/>
          {/* <Route path="/home" exact>
              {isLoggedIn ? <SuperAdminHome onLogout={logoutHandler} name={employeeName} employeeId={employeeId} tracker={employeeTracker}/> : <Redirect to='/login' /> }
          </Route> */}
        </Switch>
      </Router>
  )
}

export default App