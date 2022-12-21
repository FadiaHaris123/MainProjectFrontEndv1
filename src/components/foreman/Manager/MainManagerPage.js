
import classes from "./ManagerMainPage.module.css";
import styled from 'styled-components';
import { useState } from "react";
import AddManager from "./AddManager";
import Manager from "./Manager";
import ChittyManagers from "../ManagerDetails/ChittyManagers";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";



const Tab = styled.button`
  margin: 30px;
  height: 4rem;
  font-size: 15px;
  padding: 8px 60px;
  cursor: pointer;
  opacity: 0.6;
  border: 0;
  outline: 0;

  ${({ active }) =>
    `font-family: 'Montserrat', sans-serif;
    opacity: 0.5;
    color: black;
  `}
  ${({ active }) =>
    active &&
    `font-family: 'Montserrat', sans-serif;
    opacity: 1;
    background-color: #47586c;
    color: white;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const types = ['Manager Details', 'Add a Manager', 'Excel Upload'];

const MainManagerPage = () => {

  const [active, setActive] = useState(types[0]);

  return (
    <div>
        <Header>  </Header>
        <Navigation/>
      
        
    <div className={classes.wrap}>
    <div className={classes.tab}>
      <ButtonGroup>
        {types.map(type => (
          <Tab className={classes.tab_wrap}
            key={type}
            active={active === type} 
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </ButtonGroup>
          <div className={classes.all_tab}>
            {active==='Manager Details' && <ChittyManagers/>}
            {active === "Add a Manager" && <AddManager/>}
            {active==='Excel Upload' && <Manager/>}
          </div>
    </div>
    </div>
    </div>
  );
}



export default MainManagerPage ;