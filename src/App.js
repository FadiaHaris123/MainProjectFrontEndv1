import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom"
import Auth from "./UI/Auth"
import ForgotPassword from "./UI/ForgetPassword/ForgetPassword"
import NomineeForm from "./components/Customer/ChittyForm/NomineeForm";
import CreateNewPassword from "./UI/ForgetPassword/ResetPassword"
import registrationForm from "./UI/registrationForm"
import foreman from "./components/foreman/foreman"
import LaunchedChits from "./components/foreman/ManagerDetails/LaunchedChits"
import ForemanAuction from "./components/foreman/Auction/ForemanAuction"
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
import JoinedChits from "./components/Customer/pages/JoinedChits/JoinedChits";
import { GrLaunch } from "react-icons/gr";
import RazorPay from "./components/Customer/RazorPay/payment"
import MainManagerPage from "./components/foreman/Manager/MainManagerPage";
import AuctionRoom from "./components/AuctionRoom/AuctionRoom";


function App() {

  const history = useHistory();
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser =  `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  if (!authenticated) {
    history.push("/login");
  } else {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Auth} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/createnewpassword" component={CreateNewPassword} />
          <Route path="/register" component={registrationForm} />
          <Route exact path="/admin" component={foreman} />
          <Route exact path="/manager" component={ManagerPage} />
          <Route path="/manager/assignedchits" component={AssignedChits} />
          <Route path="/manager/changepassword" component={ChangePassword} />
          <Route path="/manager/startchit" component={StartChit} />
          <Route exact path="/employee" component={MainManagerPage} />
          <Route path="/employee/managerslist" component={ChittyManagers} />
          <Route exact path="/customer" component={Customer} />
          <Route path='/customer/auction' component={Auction} />
          <Route path='/customer/profile' component={Profile} />
          <Route path='/customer/availablechits' component={AvailableChits} />
          <Route path='/customer/joinedchits' component={JoinedChits} />
          <Route path='/customer/payment' component={RazorPay} />
          <Route path='/customer/auction/auctionroom' component={AuctionRoom} />
          <Route path='/customer/chittyform' component={ChittyForm} />
          <Route path='/customer/nomineeform' component={NomineeForm} />
          <Route path='/admin/launchedchits' component={LaunchedChits}/>
          <Route path='/admin/ForemanAuction' component={ForemanAuction}/>
          <Route path='/admin/Earnings' component={Earnings}/>
        </Switch>
      </Router>
    )
  }
}

export default App