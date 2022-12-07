
import classes from "./ManagerMainPage.module.css";
import styled from 'styled-components';
import { useState } from "react";
import AddManager from "./AddManager";
import Manager from "./Manager";
import ChittyManagers from "../ManagerDetails/ChittyManagers";
import Header from "../Header/Header";



const Tab = styled.button`
  margin: 30px;
  height: 5rem;
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;

  ${({ active }) =>
    // active &&
    `
    font-family: 'Montserrat', sans-serif;
    opacity: 1;
    color: #1a72be;
  `}
  ${({ active }) =>
    active &&
    `
    font-family: 'Montserrat', sans-serif;
    opacity: 1;
    background-color: #6898c3;
    color: white;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const types = ['Manager List', 'Add a Manager', 'Excel Upload'];

const MainManagerPage = () => {

  const [active, setActive] = useState(types[0]);

  return (
    <div>
        <Header/>
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
            {active==='Manager List' && <ChittyManagers/>}

            {active === "Add a Manager" && <AddManager/>}

            {active==='Excel Upload' && <Manager/>}
          </div>



    </div>
    </div>
    </div>

  );

}



export default MainManagerPage ;