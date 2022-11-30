import "bootstrap/dist/css/bootstrap.min.css" 
import "./App.css"
import {BrowserRouter as Router,Switch, Route } from "react-router-dom"
import Auth from "./UI/Auth"
import registrationForm from "./UI/registrationForm"
import foreman from "./components/foreman/foreman"
import Manager from "./components/foreman/Manager/Manager"
import ManagerPage from "./components/Manager/ManagerPage"
import Customer from "./components/Customer/Customer"
import LandingPage from "./components/LandingPage/LandingPage"
import ChittyForm from "./components/ChittyForm/ChittyForm"
import ChittyManagers from "./components/foreman/ManagerDetails/ChittyManagers"
import Earnings from "./components/Earnings/Earnings"
import Auction from './components/Customer/pages/CustomerAuction/Auction'
import AvailableChits from './components/Customer/pages/AvailableChits/AvailableChit'

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={ LandingPage } />
          <Route path="/login" component={Auth} />
          <Route path="/register" component={registrationForm}/>
          <Route path="/admin" component={foreman} />
          <Route exact path="/employee" component={Manager}/>
          <Route path="/manager" component={ManagerPage}/>
          <Route path="/employee/managerslist" component={ChittyManagers}/>
          <Route exact path="/customer" component={Customer}/>
          <Route path="/chittyform" component={ChittyForm}/>
          <Route path="/earnings" component={Earnings}/>
          <Route path='/customer/auction' component={Auction} />
          <Route path='/customer/availablechits' component={AvailableChits}/>
        </Switch>
      </Router>
  )
}

export default App
