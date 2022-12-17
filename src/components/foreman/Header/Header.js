import { Fragment } from 'react';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import classes from './Header.module.css';



const Header = () => {
  
    const history = useHistory();
  
    function handleClick() {
      history.push('/admin');
    }
  
  return (
    <Fragment>
      <header className={classes.header}> 
      <h1 className={classes.sideheader} onClick={handleClick}>Eminence Chitty</h1>
      
      </header>
      
    </Fragment>
  );
};

export default Header;
